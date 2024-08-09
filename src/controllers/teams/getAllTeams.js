const prisma = require("../../db");

const getAllTeams = async (req, res) => {
  try {
    const teams = await prisma.manager.findMany();
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAllTeams;