const prisma = require("../../db");

async function deleteArancelesFromPeriodo(req, res) {
  const periodoId = req.params.periodoId;

  try {
 
    const aranceles = await prisma.aranceles.findMany({
      where: {
        periodo_id: parseInt(periodoId),
      },
    });

    
    for (let arancel of aranceles) {
      await prisma.liquidacion_aranceles.deleteMany({
        where: {
          arancel_id: arancel.id,
        },
      });
    }

    
    await prisma.aranceles.deleteMany({
      where: {
        periodo_id: parseInt(periodoId),
      },
    });

    res.json({ message: 'Aranceles eliminados correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ha ocurrido un error al eliminar los aranceles' });
  }
}

module.exports = deleteArancelesFromPeriodo;