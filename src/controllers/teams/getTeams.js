const prisma = require("../../db");

const getManager = async (req, res) => {
  const { id } = req.params;

  try {
    const manager = await prisma.manager.findUnique({
      where: { id: Number(id) },
      include: {
        asesor_manager: {
          include: {
            asesor: true,
          },
        },
        asesor_coordinador: {
          include: {
            coordinador: true,
          },
        },
      },
    });

    if (!manager) {
      return res.status(404).json({ message: 'Manager no encontrado' });
    }

    res.status(200).json(manager);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getManager;