const prisma = require("../../db");

const getTotalByLiquidacion = async (req, res) => {
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
        liquidacion_aranceles_p: {
          include: {
            aranceles_publicos: true,
          },
        },
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

    const aranceles = liquidacion.liquidacion_aranceles.flatMap(la => la.aranceles);
    const aranceles_pu = liquidacion.liquidacion_aranceles_p.flatMap(la => la.aranceles_pu);
    const fondos = liquidacion.liquidacion_fondos.flatMap(la => la.fondos);


    const totalAranceles = parseFloat(aranceles.reduce((acc, curr) => acc + (curr && curr.total ? curr.total : 0), 0)).toFixed(2);
    const totalArancelesPu = parseFloat(aranceles_pu.reduce((acc, curr) => acc + (curr && curr.total ? curr.total : 0), 0)).toFixed(2);
    const totalFondos = parseFloat(fondos.reduce((acc, curr) => acc + (curr && curr.total ? curr.total : 0), 0)).toFixed(2);
    
    const totalLiquidacion = parseFloat((totalAranceles + totalArancelesPu + totalFondos)).toFixed(2);
    
    const totalLiquidacionProductoresAranceles = 0; // Por ahora siempre es 0
    const totalLiquidacionProductoresArancelesPublicos = 0; // Por ahora siempre es 0
    const totalLiquidacionProductoresArancelesFondos = 0; // Por ahora siempre es 0
    const totalLiquidacionProductores = parseFloat((totalLiquidacionProductoresAranceles + totalLiquidacionProductoresArancelesPublicos + totalLiquidacionProductoresArancelesFondos)).toFixed(2);
    
    const subtotal = parseFloat((totalLiquidacion + totalLiquidacionProductores)).toFixed(2); 
    const impuestoCreditoDebito = parseFloat((subtotal * 0.15)).toFixed(2); // preguntar como es
    const iva = parseFloat((subtotal * 0.21).toFixed(2)); // preguntar como es
    
    const total = parseFloat((subtotal - impuestoCreditoDebito - iva).toFixed(2));

    res.status(200).json({ totalAranceles, totalArancelesPu, totalFondos, totalLiquidacion, totalLiquidacionProductoresAranceles, totalLiquidacionProductoresArancelesPublicos, totalLiquidacionProductoresArancelesFondos, totalLiquidacionProductores, subtotal, impuestoCreditoDebito, iva, total});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTotalByLiquidacion;