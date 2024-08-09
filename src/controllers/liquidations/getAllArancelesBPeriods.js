const prisma = require("../../db");

async function getArancelesFromPeriodo(req, res) {
  const periodoId = req.params.periodoId;

  try {
    const aranceles = await prisma.aranceles.findMany({
      where: {
        periodo_id: parseInt(periodoId),
      },
    });


    const totalAranceles = aranceles.reduce((acc, curr) => acc + parseFloat(curr.total || 0), 0);

    res.json({ aranceles, total: totalAranceles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ha ocurrido un error al obtener los aranceles' });
  }
}

async function getArancelesPublicosFromPeriodo(req, res) {
  const periodoId = req.params.periodoId;

  try {
    const arancelesPublicos = await prisma.aranceles_publicos.findMany({
      where: {
        periodo_id: parseInt(periodoId),
      },
    });
    const totalArancelesPublicos = arancelesPublicos.reduce((acc, curr) => acc + parseFloat(curr.total || 0), 0);
    

    res.json({ arancelesPublicos, total: totalArancelesPublicos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ha ocurrido un error al obtener los aranceles públicos' });
  }
}

async function getFondosFromPeriodo(req, res) {
  const periodoId = req.params.periodoId;

  try {
    const fondos = await prisma.fondos.findMany({
      where: {
        periodo_id: parseInt(periodoId),
      },
    });

    
    const totalFondos = fondos.reduce((acc, curr) => acc + parseFloat(curr.total || 0), 0);

    res.json({ fondos, total: totalFondos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ha ocurrido un error al obtener los fondos' });
  }
}

module.exports = {
    getArancelesFromPeriodo,
    getArancelesPublicosFromPeriodo,
    getFondosFromPeriodo
  };