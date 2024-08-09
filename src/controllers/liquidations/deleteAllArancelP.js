const prisma = require("../../db");

async function deleteArancelesPublicosFromPeriodo(req, res) {
  const periodoId = req.params.periodoId;

  try {
   
    const arancelesPublicos = await prisma.aranceles_publicos.findMany({
      where: {
        periodo_id: parseInt(periodoId),
      },
    });

    
    for (let arancelPublico of arancelesPublicos) {
      await prisma.liquidacion_aranceles_p.deleteMany({
        where: {
          arancel_publico_id: arancelPublico.id,
        },
      });
    }

    await prisma.aranceles_publicos.deleteMany({
      where: {
        periodo_id: parseInt(periodoId),
      },
    });

    res.json({ message: 'Aranceles públicos eliminados correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ha ocurrido un error al eliminar los aranceles públicos' });
  }
}

module.exports = deleteArancelesPublicosFromPeriodo;