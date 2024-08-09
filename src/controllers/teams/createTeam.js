const prisma = require("../../db");

const createTeam = async (req, res) => {
  const { manager_id, coordinador_id, company, name, asesor_id } = req.body;

  try {
    const existingRelation = await prisma.equipo.findFirst({
      where: { manager_id },
    });

    if (existingRelation) {
      return res.status(400).json({ message: 'El manager ya tiene una relación existente, elimínela si ya no está activa' });
    }

    const team = await prisma.equipo.create({
      data: {  
        nombre: name,
        manager_id,
        coordinador_id
      }
    });

    const companyRecord = await prisma.empresa.findFirst({
      where: { nombre: company },
    });

    if (!companyRecord) {
      return res.status(404).json({ message: 'La compañía proporcionada no existe.' });
    }

    const teamCompanyRelation = await prisma.equipo_empresa.create({
      data: {
        equipo_id: team.id,
        empresa_id: companyRecord.id,
      },
    });

    let asesorRelation;
    if (asesor_id) {
      const existingAsesorRelation = await prisma.asesor_coordinador.findFirst({
        where: { asesor_id },
      });

      if (existingAsesorRelation) {
        return res.status(400).json({ message: 'El asesor ya tiene una relación existente, elimínela si ya no está activa' });
      }

      asesorRelation = await prisma.asesor_coordinador.create({
        data: {  
          asesor_id,
          coordinador_id
        }
      });
    }

    res.status(200).json({ message: 'Equipo creado con éxito', team, teamCompanyRelation, asesorRelation });
  } catch (error) {
    if (error.message.includes('Foreign key constraint failed')) {
      return res.status(404).json({ message: 'Uno de los dos ID no es de un usuario registrado en el sistema.' });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = createTeam;