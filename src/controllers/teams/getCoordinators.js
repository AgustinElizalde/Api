const prisma = require("../../db");

const getManagerCoordinators = async (req, res) => {
  const { id } = req.params;

  try {
    const manager = await prisma.manager.findUnique({ 
      where: { id: Number(id) },
      include: {
        asesor_manager: {
          include: {
            coordinador: true
          }
        }
      }
    });

    if (!manager) {
      return res.status(404).json({ message: 'Manager no encontrado' });
    }

    const coordinators = manager.asesor_manager.map(relation => relation.coordinador);

    res.status(200).json(coordinators);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getManagerCoordinators;