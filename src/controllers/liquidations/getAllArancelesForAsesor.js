const prisma = require("../../db");

const getArancelesByLiquidacion = async (req, res) => {
  const { periodo_id, id, rol } = req.params;

  try {
    const liquidacion = await prisma.liquidaciones.findFirst({
      where: {
        [`${rol}_id`]: Number(id),
        periodo_id: Number(periodo_id),
      },
      include: {
        liquidacion_aranceles: {
          include: {
            aranceles: true,
          },
        },
      },
    });

    if (!liquidacion) {
      return res.status(404).json({ error: "No se encontró la liquidación" });
    }

    const aranceles = liquidacion.liquidacion_aranceles.flatMap(la => la.aranceles);

    res.status(200).json(aranceles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getArancelesByLiquidacion;