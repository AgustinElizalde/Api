const prisma = require("../../db");

const loginClient = async (req, res) => {
    
    const { email} = req.body;
    try {
    const client = await prisma.cliente.findFirst({ where: { email } });
        console.log("Valor de email:", email);
        console.log("Valor de password",password)
        console.log("Valor de cliente",client)
    if (!client) {
      return res.status(404).json({ message: 'No se encontró ningún cliente con ese email' });
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = loginClient;