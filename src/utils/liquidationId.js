const prisma = require("../db");
const getLiquidacionId = async (id, periodo_id, rol) => {
  let liquidacion = await prisma.liquidaciones.findFirst({
    where: {
      OR: [
        { asesor_id: id },
        { coordinador_id: id },
        { manager_id: id },
      ],
      periodo_id: parseInt(periodo_id)
    },
  });

  if (!liquidacion) {
    const data = { periodo_id: parseInt(periodo_id) };
    data[`${rol}_id`] = id;

    liquidacion = await prisma.liquidaciones.create({
      data: data,
    });
  }

  return liquidacion.id;
};

module.exports = getLiquidacionId;
