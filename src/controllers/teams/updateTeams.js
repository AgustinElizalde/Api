const prisma = require("../../db");

const updateTeam = async (req, res) => {
  const { equipo_id, coordinador_id } = req.body;

  try {
    const team = await prisma.equipo.findUnique({ where: { id: equipo_id } });

    if (!team) {
      return res.status(404).json({ message: 'Equipo no encontrado' });
    }

    const updatedTeam = await prisma.equipo.update({
      where: { id: equipo_id },
      data: { coordinador_id },
    });

    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateTeam;