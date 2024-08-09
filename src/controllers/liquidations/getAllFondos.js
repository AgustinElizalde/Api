const prisma = require("../../db");
const getFondosByLiquidacion = async (req, res) => {
    const { periodo_id, id, rol } = req.params;
  
    try {
      const liquidacion = await prisma.liquidaciones.findFirst({
        where: {
          [`${rol}_id`]: Number(id),
          periodo_id: Number(periodo_id),
        },
        include: {
          liquidacion_fondos: {
            include: {
              fondos: true,
            },
          },
        },
      });
  
      if (!liquidacion) {
        return res.status(404).json({ error: "No se encontró la liquidación" });
      }
  
      const fondos = liquidacion.liquidacion_fondos.flatMap(lf => lf.fondos);
  
      res.status(200).json(fondos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = getFondosByLiquidacion;