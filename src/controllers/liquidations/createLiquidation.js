const prisma = require("../../db");

const createLiquidacion = async (req, res) => {
  const { asesor_id, coordinador_id, manager_id, periodo_id, estado, fecha_pago } = req.body;

  
  const ids = [asesor_id, coordinador_id, manager_id].filter(id => id !== undefined);
  if (ids.length !== 1) {
    return res.status(400).json({ error: 'Debe proporcionar exactamente uno de asesor_id, coordinador_id y manager_id' });
  }

  try {
    const newLiquidacion = await prisma.liquidaciones.create({
      data: {
        asesor_id,
        coordinador_id,
        manager_id,
        periodo_id,
        estado,
        fecha_pago: new Date(fecha_pago),
      },
    });

    res.status(201).json(newLiquidacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createLiquidacion;