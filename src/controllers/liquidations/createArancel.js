const readXlsxFile = require('read-excel-file/node');
const prisma = require("../../db");
const getRelacionId = require('../../utils/getRelationId');
const getAsesorFromRelacion = require('../../utils/getAsesorFromRelation');
const getLiquidacionId = require('../../utils/liquidationId');


const validateRow = (row, rowIndex) => {
  const errors = [];

  const columns = [
    { name: 'numero_cuenta', isNumber: true }, //nro comitente
    { name: 'cliente', isNumber: false }, //nombre del  cliente
    { name: 'tipo_de_arance', isNumber: false }, //un string que nos chupa un huevo
    { name: 'prima', isNumber: true }, //monto

  ];

  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];

    if (!row[i] || (column.isNumber && isNaN(Number(row[i])))) {
      errors.push(`Error en la fila ${rowIndex + 1}, columna ${i + 1} (${column.name}): debe ser ${column.isNumber ? 'un número' : 'una cadena'}`);
    }
  }

  return errors;
};


const createArancelesFromExcel = async (req, res) => {
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
          if (index === 3 || index === 4 || index === 5 || index === 6) {
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
      return res.status(400).json({ errors });
    }

    const numeroCuentas = [...new Set(rows.map(row => Number(row[0])))];
    const relaciones = {};

    for (const numeroCuenta of numeroCuentas) {

      relaciones[numeroCuenta] = await getRelacionId(numeroCuenta, periodo_id);
    }



    const aranceles = await Promise.all(rows.map(async (row) => {
      const numero_cuenta = Number(row[0]);
      //tenemos que saber que compania es para saber que porcentaje de comision se le va a aplicar
      const relacion_id = relaciones[numero_cuenta];
      //modificar para que se obtenga el porcetaje de cada asesor y compañeros segun la compañia
      const { id, rol } = await getAsesorFromRelacion(relacion_id);

      const liquidacion_id = await getLiquidacionId(id, periodo_id, rol);
      //esto tiene que crear una liquidacion por cada asesor que cobre comision del arancel

      const comisiones = await prisma.asesor.findFirst({
        where: {
          id:id
        },
        select: {
          comisionManager1: true,
          comisionCoordinador1: true,
        }
      });

      comisionManager = 0
      
      comisionCoordinador = 0

      if (rol === "manager") {
        porcentaje_comi = 70;
      } else if (rol === "asesor") {
        comisionManager = comisiones?.comisionManager1
        comisionCoordinador = comisiones?.comisionCoordinador1
        porcentaje_comi = 28;
      }

      const prima_desc = Number(row[3]) * 0.28;

      const total = prima_desc * porcentaje_comi / 100;
      
      const totalManager = prima_desc * comisionManager / 100;

      const totalCoordinador = prima_desc * comisionCoordinador / 100
    
      return {
        arancel: {
          numero_cuenta: numero_cuenta,
          cliente: row[1],
          tipo_de_arance: row[2],
          prima: Number(row[3]),
          porcentaje_comi: porcentaje_comi,
          prima_desc: prima_desc,
          total: total,
          periodo_id: Number(periodo_id),
        },
        liquidacion_id: liquidacion_id,
      };
    }));
    
    await prisma.aranceles.createMany({
      data: aranceles.map(arancel => arancel.arancel),
    });
    
    // Obtén los aranceles que acabas de crear
    const createdAranceles = await prisma.aranceles.findMany({
      where: {
        periodo_id: Number(periodo_id)
      },
      orderBy: {
        id: 'desc'
      },
      take: aranceles.length
    });
    
    const liquidacionArancelRelations = createdAranceles.map((arancel, index) => ({
      arancel_id: arancel.id,
      liquidacion_id: aranceles[index].liquidacion_id
    }));
    
    await prisma.liquidacion_aranceles.createMany({
      data: liquidacionArancelRelations
    });
    const createdRelations = await prisma.liquidacion_aranceles.findMany({
      where: {
        liquidacion_id: {
          in: liquidacionArancelRelations.map(relation => relation.liquidacion_id)
        },
        arancel_id: {
          in: liquidacionArancelRelations.map(relation => relation.arancel_id)
        }
      }
    });

    res.status(201).json({ createdAranceles, createdRelations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = createArancelesFromExcel;