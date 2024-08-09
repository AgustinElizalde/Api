const prisma = require("../../db");

const getArchivosByLiquidacion = async (req, res) => {
  const { periodo_id, id, rol } = req.params;

  try {
    const liquidacion = await prisma.liquidaciones.findFirst({
      where: {
        [`${rol}_id`]: Number(id),
        periodo_id: Number(periodo_id),
      },
      include: {
        liquidacion_aranceles: true,
        liquidacion_aranceles_p: true,
        liquidacion_fondos: true,
      },
    });

    if (!liquidacion) {
      return res.status(404).json({ error: "No se encontró la liquidación" });
    }

    const response = [];

    if (liquidacion.liquidacion_aranceles && liquidacion.liquidacion_aranceles.length > 0) {
      response.push("Aranceles");
    }

    if (liquidacion.liquidacion_aranceles_p && liquidacion.liquidacion_aranceles_p.length > 0) {
      response.push("Aranceles Publicos");
    }

    if (liquidacion.liquidacion_fondos && liquidacion.liquidacion_fondos.length > 0) {
      response.push("Fondos");
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getArchivosByLiquidacion;