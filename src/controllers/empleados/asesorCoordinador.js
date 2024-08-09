const prisma = require("../../db");

const asesorCoordinador = async (req, res) => {
  const { asesor_id,coordinador_id } = req.body;

  try {
    const existingRelation = await prisma.asesor_coordinador.findFirst({
        where: { asesor_id },
      });
  
      if (existingRelation) {
        return res.status(400).json({ message: 'El asesor ya tiene una relación existente, elimínela si ya no está activa' });
      }
   const relation = await prisma.asesor_coordinador.create({
    data: {  
      asesor_id,
      coordinador_id
    }
    });

    res.status(200).json({ message: 'Asesor relacionado con éxito', relation  });
  } catch (error) {
    if (error.message.includes('Foreign key constraint failed')) {
        return res.status(404).json({ message: 'Uno de los dos ID no es de un usuario registrado en el sistema.' });
      }
    res.status(500).json({ error: error.message });
  }
};

module.exports = asesorCoordinador;