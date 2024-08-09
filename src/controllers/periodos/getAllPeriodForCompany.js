const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getPeriodsByCompanyId = async (req, res) => {
  const { compa_ia_id } = req.params;

  if (!compa_ia_id || isNaN(compa_ia_id)) {
    return res.status(400).json({ error: "compa_ia_id is required and must be a number" });
  }

  try {
    const periods = await prisma.periodos.findMany({
      where: {
        compa_ia_id: {
          equals: Number(compa_ia_id),
        },
      },
      orderBy: {
        fecha_creacion: 'desc',
      },
    });

    res.status(200).json(periods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getPeriodsByCompanyId;

