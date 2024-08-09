const prisma = require("../../db");

const getArancelesPuByLiquidacion = async (req, res) => {
    const { periodo_id, id, rol } = req.params;
  
    try {
      const liquidacion = await prisma.liquidaciones.findFirst({
        where: {
          [`${rol}_id`]: Number(id),
          periodo_id: Number(periodo_id),
        },
        include: {
          liquidacion_aranceles_pu: {
            include: {
              aranceles: true,
            },
          },
        },
      });
  
      if (!liquidacion) {
        return res.status(404).json({ error: "No se encontró la liquidación" });
      }
  
      const aranceles_pu = liquidacion.liquidacion_aranceles_pu.flatMap(lap => lap.aranceles);
  
      res.status(200).json(aranceles_pu);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  module.exports = getArancelesPuByLiquidacion;