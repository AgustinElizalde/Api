const { parse, format } = require('date-fns');
const prisma = require("../../db");

const registerCoordinator = async (req, res) => {
  const { username, apellido, nombre, fecha_nacimiento, fecha_ingreso, inscripto_iva, cuit, email, interno_externo, contrasena, manager_id,
    comisionEmpresa1,
    comisionEmpresa2,
    comisionEmpresa3,
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

    const existingEmail = await prisma.coordinador.findFirst({
      where: { email: email },
    });

    if (existingEmail) {
      return res.status(400).json({ message: 'El email ya está en uso' });
    } else {
      const coordinator = await prisma.coordinador.create({
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
          comisionManager1,
          comisionManager2,
          comisionManager3,  
        },
      });
      const relation = await prisma.asesor_manager.create({
        data: {
          manager_id: Number(manager_id),
          coordinador_id: coordinator.id,
        },
      });
      res.json({ coordinator, relation });
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

module.exports = registerCoordinator;