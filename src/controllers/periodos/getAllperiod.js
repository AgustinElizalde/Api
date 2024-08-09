const prisma = require("../../db");

const getAllPeriods = async (req, res) => {
  try {
    const allPeriods = await prisma.periodos.findMany();

    res.status(200).json(allPeriods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAllPeriods;