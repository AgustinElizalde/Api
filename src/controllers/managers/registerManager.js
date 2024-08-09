const { parse, format } = require('date-fns');
const prisma = require("../../db");

const registerManager = async (req, res) => {
  const { 
    username, apellido, nombre, fecha_nacimiento, fecha_ingreso, 
    inscripto_iva, cuit, email, interno_externo, contrasena,
    comisionEmpresa1,
    comisionEmpresa2,
    comisionEmpresa3,

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
    // if (v_manager_manager === undefined) return res.status(400).json({ message: 'Falta v_manager_manager' });
    // if (v_manager_coordinador === undefined) return res.status(400).json({ message: 'Falta v_manager_coordinador' });
    // if (v_manager_asesor === undefined) return res.status(400).json({ message: 'Falta v_manager_asesor' });
    // if (v_coordinador_manager === undefined) return res.status(400).json({ message: 'Falta v_coordinador_manager' });
    // if (v_coordinador_coordinador === undefined) return res.status(400).json({ message: 'Falta v_coordinador_coordinador' });
    // if (v_coordinador_asesor === undefined) return res.status(400).json({ message: 'Falta v_coordinador_asesor' });
    // if (v_asesor_manager === undefined) return res.status(400).json({ message: 'Falta v_asesor_manager' });
    // if (v_asesor_coordinador === undefined) return res.status(400).json({ message: 'Falta v_asesor_coordinador' });
    // if (v_asesor_asesor === undefined) return res.status(400).json({ message: 'Falta v_asesor_asesor' });
    // if (v_asesor_sc_manager === undefined) return res.status(400).json({ message: 'Falta v_asesor_sc_manager' });
    // if (v_asesor_sc_asesor === undefined) return res.status(400).json({ message: 'Falta v_asesor_sc_asesor' });



    const fechaNacString = fecha_nacimiento;
    const fechaNac = parse(fechaNacString, 'yyyy-MM-dd', new Date());
    const fechaNacISO = format(fechaNac, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

    const fechaIngresoString = fecha_ingreso;
    const fechaIngreso = parse(fechaIngresoString, 'yyyy-MM-dd', new Date());
    const fechaIngresoISO = format(fechaIngreso, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

    const existingEmail = await prisma.manager.findFirst({
      where: { email: email },
    });

    if (existingEmail) {
      return res.status(400).json({ message: 'El email ya está en uso' });
    } else {
      const manager = await prisma.manager.create({
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
          
        },
      });

      // const commission = await prisma.comisiones.create({
      //   data: {  
      //     v_manager_manager,
      //     v_manager_coordinador,
      //     v_manager_asesor,
      //     v_coordinador_manager,
      //     v_coordinador_coordinador,
      //     v_coordinador_asesor,
      //     v_asesor_manager,
      //     v_asesor_coordinador,
      //     v_asesor_asesor,
      //     v_asesor_sc_manager,
      //     v_asesor_sc_asesor,
      //     manager_id: manager.id,
      //   }
      // });



      res.json({ manager });
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

module.exports = registerManager;