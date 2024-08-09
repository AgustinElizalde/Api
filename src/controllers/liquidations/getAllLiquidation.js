const prisma = require("../../db");

const getAllLiquidationsByPeriod = async (req, res) => {
  const { periodo_id } = req.params;

  try {
    const liquidations = await prisma.liquidaciones.findMany({
      where: {
        periodo_id: Number(periodo_id),
      }, include: {
        coordinador: true,
        manager: true,
        asesor: true,
        periodos:true,
      },
      
    });

    res.status(200).json(liquidations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAllLiquidationsByPeriod;