const { parse, format } = require('date-fns');
const prisma = require("../../db");

const registerAsesor = async (req, res) => {
  const {
    username,
    apellido,
    nombre,
    fecha_nacimiento,
    fecha_ingreso,
    inscripto_iva,
    cuit,
    email,
    interno_externo,
    contrasena,
    manager_id,
    coordinador_id,
    comisionEmpresa1,
    comisionEmpresa2,
    comisionEmpresa3,
    comisionCoordinador1,
    comisionCoordinador2,
    comisionCoordinador3,
    comisionManager1,
    comisionManager2,
    comisionManager3,
  } = req.body;

  try {
    console.log("Entraste al registro")
    if (!nombre || typeof nombre !== 'string') {
      return res.status(400).json({ message: 'Nombre inválido' });
    }
    if (!apellido || typeof apellido !== 'string') {
      return res.status(400).json({ message: 'Apellido inválido' });
    }
    if (!username || typeof username !== 'string') {
      return res.status(400).json({ message: 'Username inválido' });
    }
    if (!contrasena || typeof contrasena !== 'string') {
      return res.status(400).json({ message: 'Contraseña inválida o vacía' });
    }
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ message: 'Email inválido' });
    }

    const fechaNacString = fecha_nacimiento;
    const fechaNac = parse(fechaNacString, 'yyyy-MM-dd', new Date());
    const fechaNacISO = format(fechaNac, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

    const fechaIngresoString = fecha_ingreso;
    const fechaIngreso = parse(fechaIngresoString, 'yyyy-MM-dd', new Date());
    const fechaIngresoISO = format(fechaIngreso, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

    const existingEmail = await prisma.asesor.findFirst({
      where: { email: email },
    });

    if (existingEmail) {
      return res.status(400).json({ message: 'El email ya está en uso' });
    } else {
      const asesor = await prisma.asesor.create({
        data: { 
          username, 
          apellido, 
          nombre, 
          fecha_nacimiento: fechaNacISO, 
          fecha_ingreso: fechaIngresoISO, 
          inscripto_iva, 
          cuit, 
          email, 
          interno_externo, 
          contrasena,
          comisionEmpresa1,
          comisionEmpresa2,
          comisionEmpresa3,
          comisionCoordinador1,
          comisionCoordinador2,
          comisionCoordinador3,
          comisionManager1,
          comisionManager2,
          comisionManager3, 
        },
      });

      const manager = await prisma.manager.findUnique({
        where: { id: manager_id },
      });
      
      if (!manager) {
        return res.status(400).json({ error: 'El manager no existe' });
      }

        await prisma.asesor_manager.create({
          data: {
            manager_id: Number(manager_id),
            asesor_id: asesor.id,
          },
        });
      

      if (coordinador_id) {
        await prisma.asesor_coordinador.create({
          data: {
            coordinador_id: Number(coordinador_id),
            asesor_id: asesor.id,
          },
        });
      }
      res.json(asesor);
    }

  } catch (error) {
    if (error.message.includes('match')) {
      return res.status(400).json({ message: 'Asegúrate de estar proporcionando las fechas(nacimiento y ingreso) correctamente.' });
    }
    if (error.message.includes('The provided value for the column is too long')) {
      return res.status(400).json({ message: 'Has proporcionado demasiado texto para el campo interno_externo.' });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = registerAsesor;