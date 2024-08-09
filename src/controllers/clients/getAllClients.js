const prisma = require("../../db");

const getAllClients = async (req, res) => {
  try {
    const clients = await prisma.cliente.findMany();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAllClients;