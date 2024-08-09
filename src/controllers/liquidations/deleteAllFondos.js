const prisma = require("../../db");

async function deleteFondosFromPeriodo(req, res) {
  const periodoId = req.params.periodoId;

  try {

    const fondos = await prisma.fondos.findMany({
      where: {
        periodo_id: parseInt(periodoId),
      },
    });


    for (let fondo of fondos) {
      await prisma.liquidacion_fondos.deleteMany({
        where: {
          fondo_id: fondo.id,
        },
      });
    }


    await prisma.fondos.deleteMany({
      where: {
        periodo_id: parseInt(periodoId),
      },
    });

    res.json({ message: 'Fondos eliminados correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ha ocurrido un error al eliminar los fondos' });
  }
}

module.exports = deleteFondosFromPeriodo;