const { parse, format } = require('date-fns');
const prisma = require("../../db");

const updateManager = async (req, res) => {
  const { id } = req.params;
  const { username, apellido, nombre, fecha_nacimiento, fecha_ingreso, inscripto_iva, cuit, email, interno_externo, contrasena,    comisionEmpresa1,
    comisionEmpresa2,
    comisionEmpresa3, } = req.body;

  try {
    const existingManager = await prisma.manager.findUnique({ where: { id_Manager: Number(id) } });

    if (!existingManager) {
      return res.status(404).json({ message: 'No se encontró ningún manager con ese ID' });
    }

    const fechaNacString = fecha_nacimiento;
    const fechaNac = parse(fechaNacString, 'dd/MM/yyyy', new Date());
    const fechaNacISO = format(fechaNac, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

    const fechaIngresoString = fecha_ingreso;
    const fechaIngreso = parse(fechaIngresoString, 'dd/MM/yyyy', new Date());
    const fechaIngresoISO = format(fechaIngreso, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

    const updatedManager = await prisma.manager.update({
      where: { id_manager: Number(id) },
      data: {
        username: username || existingManager.username,
        apellido: apellido || existingManager.apellido,
        nombre: nombre || existingManager.nombre,
        fecha_nacimiento: fechaNacISO || existingManager.fecha_nacimiento,
        fecha_ingreso: fechaIngresoISO || existingManager.fecha_ingreso,
        inscripto_iva: inscripto_iva || existingManager.inscripto_iva,
        cuit: cuit || existingManager.cuit,
        email: email || existingManager.email,
        interno_externo: interno_externo || existingManager.interno_externo,
        contrasena: contrasena || existingManager.contrasena,
        comisionEmpresa1: comisionEmpresa1 || existingManager.comisionEmpresa1,
        comisionEmpresa2: comisionEmpresa2 || existingManager.comisionEmpresa2,
        comisionEmpresa3: comisionEmpresa3 || existingManager.comisionEmpresa3,
      },
    });

    res.status(200).json(updatedManager);
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

module.exports = updateManager;