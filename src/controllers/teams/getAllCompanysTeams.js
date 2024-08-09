const prisma = require("../../db");

const getAllCompanysManagers = async (req, res) => {
  const { nombre } = req.params;

  try {
    const company = await prisma.empresa.findFirst({ where: { nombre } });
    if (!company) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }

    const managers = await prisma.equipo_empresa.findMany({
      where: { empresa_id: company.id },
      include: {
        manager: {
          select: { username: true, apellido: true, nombre: true }
        }
      }
    });

    res.status(200).json(managers.map(m => m.manager));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAllCompanysManagers;