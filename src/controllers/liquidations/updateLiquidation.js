const prisma = require("../../db");

const updateLiquidacion = async (req, res) => {
  const { id, periodo_id, estado, fecha_pago } = req.body;

  try {
    const updatedLiquidacion = await prisma.liquidaciones.update({
      where: { id },
      data: {
        periodo_id,
        estado,
        fecha_pago: new Date(fecha_pago),
      },
    });

    res.status(200).json(updatedLiquidacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateLiquidacion;