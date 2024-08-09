const prisma = require("../../db");

const createCompany = async (req, res) => {
  const { name } = req.body;

  try {
    const existingCompany = await prisma.empresa.findFirst({
        where: { nombre:name },
      });
  
      if (existingCompany) {
        return res.status(400).json({ message: 'La empresa ya existe' });
      }
      if (!name || typeof name !== 'string') {
        return res.status(400).json({ message: 'Nombre inválido' });
      }
   const company = await prisma.empresa.create({
    data: {  
    nombre:name,
    }
    });

    res.status(200).json({ message: 'Empresa creada con éxito', company  });
  } catch (error) {
    if (error.message.includes('Foreign key constraint failed')) {
        return res.status(404).json({ message: 'El ID no es de un usuario registrado en el sistema.' });
      }
    res.status(500).json({ error: error.message });
  }
}
module.exports = createCompany;