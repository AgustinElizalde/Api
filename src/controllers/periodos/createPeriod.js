const prisma = require("../../db");

const createPeriodo = async (req, res) => {
  // Datos de ejemplo (rellenados manualmente)
  const fecha_creacion = '2024-08-07'; // Fecha en formato 'YYYY-MM-DD'
  const compa_ia_id = 1; // ID de la compañía

  // Validar que `compa_ia_id` esté definido y sea un número entero
  if (compa_ia_id === undefined || compa_ia_id === null || isNaN(Number(compa_ia_id))) {
    return res.status(400).json({ error: 'El ID de la compañía no está definido o no es un número válido.' });
  }
  const compa_ia_id_num = Number(compa_ia_id);

  // Convertir `fecha_creacion` a un objeto Date
  const fechaCreacion = new Date(fecha_creacion);

  // Validar que `fecha_creacion` sea una fecha válida
  if (isNaN(fechaCreacion.getTime())) {
    return res.status(400).json({ error: 'Fecha de creación inválida.' });
  }

  try {
    // Buscar la compañía por ID
    const compania = await prisma.empresa.findUnique({
      where: { id: compa_ia_id_num },
    });

    if (!compania) {
      return res.status(404).json({ error: 'Compañía no encontrada' });
    }

    // Verificar si ya existe un periodo con la misma fecha para esta compañía
    const existingPeriodo = await prisma.periodos.findFirst({
      where: {
        compa_ia_id: compa_ia_id_num,
        fecha_creacion: {
          gte: new Date(fechaCreacion.setHours(0, 0, 0, 0)),
          lt: new Date(fechaCreacion.setHours(23, 59, 59, 999)),
        },
      },
    });

    if (existingPeriodo) {
      return res.status(400).json({ error: 'Ya existe un periodo con la misma fecha para esta compañía' });
    }

    // Crear el nuevo periodo
    const newPeriodo = await prisma.periodos.create({
      data: {
        fecha_creacion: fechaCreacion,
        compa_ia_id: compa_ia_id_num,
      },
    });

    // Enviar respuesta de éxito
    res.status(201).json(newPeriodo);
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ error: error.message });
  }
};

module.exports = createPeriodo;
