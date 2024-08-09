const prisma = require("../../db");

const getEmployees = async (req, res) => {
  const { nombre } = req.params;

  try {
    const company = await prisma.empresa.findFirst({ where: { nombre } });
    if (!company) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }

    const teams = await prisma.equipo_empresa.findMany({
      where: { empresa_id: company.id },
      select: { equipo_id: true },
    });

    const teamIds = teams.map(team => team.equipo_id);

    const managers = await prisma.equipo.findMany({
      where: { id: { in: teamIds } },
      select: { manager: true },
    });

    const coordinadores = await prisma.equipo.findMany({
      where: { id: { in: teamIds } },
      select: { coordinador: true },
    });

    const asesores = await prisma.asesor_coordinador.findMany({
      where: { coordinador_id: { in: coordinadores.map(c => c.coordinador.id) } },
      select: { asesor: true },
    });

    res.status(200).json({
      managers: managers.map(m => m.manager),
      coordinadores: coordinadores.map(c => c.coordinador),
      asesores: asesores.map(a => a.asesor),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getEmployees;