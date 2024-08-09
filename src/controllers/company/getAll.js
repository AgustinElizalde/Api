const prisma = require("../../db");

const getAll = async (req, res) => {
  try {
    const companies = await prisma.empresa.findMany();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAll;