const readXlsxFile = require('read-excel-file/node');
const prisma = require("../../db");
const getRelacionId = require('../../utils/getRelationId');
const getAsesorFromRelacion = require('../../utils/getAsesorFromRelation');
const getLiquidacionId = require('../../utils/liquidationId');


const validateRow = (row, rowIndex) => {
  const errors = [];

  const columns = [
    { name: 'numero_cuenta', isNumber: true },
    { name: 'cliente', isNumber: false },
    { name: 'prima', isNumber: true },
    { name: 'porcentaje_comi', isNumber: true },
    { name: 'prima_desc', isNumber: true },
    { name: 'tipo_de_cambio', isNumber: true },
    { name: 'total', isNumber: true },
  ];

  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];

    if (!row[i] || (column.isNumber && isNaN(Number(row[i])))) {
      errors.push(`Error en la fila ${rowIndex + 1}, columna ${i + 1} (${column.name}): debe ser ${column.isNumber ? 'un número' : 'una cadena'}`);
    }
  }

  return errors;
};

const createArancelesPuFromExcel = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Debes subir un archivo' });
  }
  const { periodo_id } = req.body;
  if (!periodo_id) {
    return res.status(400).json({ error: 'Debes proporcionar un periodo_id' });
  }
  try {
    let rows = await readXlsxFile(req.file.path);
    rows.shift();
    
    rows = rows.map(row => {
      return row.map((cell, index) => {
        if (typeof cell === 'string') {
          if (index === 2 || index === 3 || index === 4 || index === 5 || index === 6) {
            cell = cell.replace(",", ".");
            cell = cell.replace("%", "");
            cell = parseFloat(cell);
          }
        }
        return cell;
      });
    });
    
    const errors = [];
    for (let i = 0; i < rows.length; i++) {
      const rowErrors = validateRow(rows[i], i);
      errors.push(...rowErrors);
    }
    
    if (errors.length > 0) {
      return res.status(400).json({ error: 'Errores de validación', details: errors });
    }

    const numeroCuentas = [...new Set(rows.map(row => Number(row[0])))];
    const relaciones = {};

    for (const numeroCuenta of numeroCuentas) {
      relaciones[numeroCuenta] = await getRelacionId(numeroCuenta, periodo_id);
    }

    const aranceles = await Promise.all(rows.map(async (row) => {
      const numero_cuenta = Number(row[0]);
      const relacion_id = relaciones[numero_cuenta];
      const { id, rol } = await getAsesorFromRelacion(relacion_id);
      const liquidacion_id = await getLiquidacionId(id, periodo_id, rol);

      return {
        arancel:{
        numero_cuenta: numero_cuenta,
        cliente: row[1],
        prima: Number(row[2]),
        porcentaje_comi: Number(row[3]),
        prima_desc: Number(row[4]),
        tipo_de_cambio: Number(row[5]),
        total: Number(row[6]),
        periodo_id: Number(periodo_id)
      },
      liquidacion_id: liquidacion_id,
      };
    }));

    await prisma.aranceles_publicos.createMany({
      data: aranceles.map(arancel => arancel.arancel),
    });
    
    // Obtén los aranceles que acabas de crear
    const createdAranceles = await prisma.aranceles_publicos.findMany({
      where: {
        periodo_id: Number(periodo_id)
      },
      orderBy: {
        id: 'desc'
      },
      take: aranceles.length
    });

    const liquidacionArancelRelations = createdAranceles.map((arancel, index) => ({
      arancel_publico_id: arancel.id,
      liquidacion_id: aranceles[index].liquidacion_id
    }));

    await prisma.liquidacion_aranceles_p.createMany({
      data: liquidacionArancelRelations
    });
    const createdRelations = await prisma.liquidacion_aranceles_p.findMany({
      where: {
        liquidacion_id: {
          in: liquidacionArancelRelations.map(relation => relation.liquidacion_id)
        },
        arancel_publico_id: {
          in: liquidacionArancelRelations.map(relation => relation.arancel_publico_id)
        }
      }
    });

    res.status(201).json({ createdAranceles, createdRelations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createArancelesPuFromExcel;