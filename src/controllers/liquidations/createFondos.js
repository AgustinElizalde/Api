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
    { name: 'total', isNumber: true },
  ];



  if (!row[0] || isNaN(Number(row[0]))) {
    errors.push(`Error en la fila ${rowIndex + 1}, columna 1 (${columns[0].name}): debe ser un número`);
  }

  if (!row[1]) {
    errors.push(`Error en la fila ${rowIndex + 1}, columna 2 (${columns[1].name}): no debe estar vacía`);
  }

  if (!row[2] || isNaN(Number(row[2]))) {
    errors.push(`Error en la fila ${rowIndex + 1}, columna 3 (${columns[2].name}): debe ser un número`);
  }

  if (!row[3] || isNaN(Number(row[3]))) {
    errors.push(`Error en la fila ${rowIndex + 1}, columna 4 (${columns[3].name}): debe ser un número`);
  }

  if (!row[4] || isNaN(Number(row[4]))) {
    errors.push(`Error en la fila ${rowIndex + 1}, columna 5 (${columns[4].name}): debe ser un número`);
  }

  if (!row[5] || isNaN(Number(row[5]))) {
    errors.push(`Error en la fila ${rowIndex + 1}, columna 6 (${columns[5].name}): debe ser un número`);
  }
  
  return errors;
};


const createFondosFromExcel = async (req, res) => {
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
            // Reemplazar las comas por puntos y eliminar el signo de porcentaje
            cell = cell.replace(",", ".");
            cell = cell.replace("%", "");
            // Convertir a número
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

    const fondos = await Promise.all(rows.map(async (row) => {
      const numero_cuenta = Number(row[0]);
      const relacion_id = relaciones[numero_cuenta];
      const { id, rol } = await getAsesorFromRelacion(relacion_id);
      const liquidacion_id = await getLiquidacionId(id, periodo_id, rol);

      return {
        fondo:{
        numero_cuenta: numero_cuenta,
        cliente: row[1],
        prima: Number(row[2]),
        porcentaje_comi: Number(row[3]),
        prima_desc: Number(row[4]),
        total: Number(row[5]),
        periodo_id: Number(periodo_id),
      
      },
      liquidacion_id: liquidacion_id
    }
    }));

   await prisma.fondos.createMany({
      data: fondos.map(fondos => fondos.fondo),
    });


  const createdFondos = await prisma.fondos.findMany({
    where: {
      periodo_id: Number(periodo_id)
    },
    orderBy: {
      id: 'desc'
    },
    take: fondos.length
  });


    const liquidacionFondosRelations = createdFondos.map((fondo,index) => ({
      fondo_id: fondo.id,
      liquidacion_id: fondos[index].liquidacion_id
    }));

    await prisma.liquidacion_fondos.createMany({
      data: liquidacionFondosRelations
    });

    const createdRelations = await prisma.liquidacion_fondos.findMany({
      where: {
        liquidacion_id: {
          in: liquidacionFondosRelations.map(relation => relation.liquidacion_id)
        },
        fondo_id: {
          in: liquidacionFondosRelations.map(relation => relation.fondo_id)
        }
      }
    });

    res.status(201).json(createdFondos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createFondosFromExcel;