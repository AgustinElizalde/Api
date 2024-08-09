const prisma = require("../../db");

const getAll = async (req, res) => {
  try {
    const managers = await prisma.manager.findMany({
      select: { nombre: true, apellido: true, username: true, id: true},
    });

    const coordinadores = await prisma.coordinador.findMany({
      select: { nombre: true, apellido: true, username: true, id: true},
    });

    const asesores = await prisma.asesor.findMany({
      select: { nombre: true, apellido: true, username: true, id: true},
    });

    res.status(200).json({ managers, coordinadores, asesores });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAll;