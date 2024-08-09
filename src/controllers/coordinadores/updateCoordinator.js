const { parse, format } = require('date-fns');
const prisma = require("../../db");

const updateCoordinator = async (req, res) => {
  const { id } = req.params;
  const { username, apellido, nombre, fecha_nacimiento, fecha_ingreso, inscripto_iva, cuit, email, interno_externo, contrasena,       comisionEmpresa1,
    comisionEmpresa2,
    comisionEmpresa3,
    comisionManager1,
    comisionManager2,
    comisionManager3 } = req.body;

  try {
    const existingCoordinator = await prisma.coordinador.findUnique({ where: { id_coordinador: Number(id) } });

    if (!existingCoordinator) {
      return res.status(404).json({ message: 'No se encontró ningún coordinador con ese ID' });
    }

    const fechaNacString = fecha_nacimiento;
    const fechaNac = parse(fechaNacString, 'dd/MM/yyyy', new Date());
    const fechaNacISO = format(fechaNac, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

    const fechaIngresoString = fecha_ingreso;
    const fechaIngreso = parse(fechaIngresoString, 'dd/MM/yyyy', new Date());
    const fechaIngresoISO = format(fechaIngreso, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

    const updatedCoordinator = await prisma.coordinador.update({
      where: { id_coordinador: Number(id) },
      data: {
        username: username || existingCoordinator.username,
        apellido: apellido || existingCoordinator.apellido,
        nombre: nombre || existingCoordinator.nombre,
        fecha_nacimiento: fechaNacISO || existingCoordinator.fecha_nacimiento,
        fecha_ingreso: fechaIngresoISO || existingCoordinator.fecha_ingreso,
        inscripto_iva: inscripto_iva || existingCoordinator.inscripto_iva,
        cuit: cuit || existingCoordinator.cuit,
        email: email || existingCoordinator.email,
        interno_externo: interno_externo || existingCoordinator.interno_externo,
        contrasena: contrasena || existingCoordinator.contrasena,
        comisionEmpresa1: comisionEmpresa1 || existingCoordinator.comisionEmpresa1,
        comisionEmpresa2: comisionEmpresa2 || existingCoordinator.comisionEmpresa2,
        comisionEmpresa3: comisionEmpresa3 || existingCoordinator.comisionEmpresa3,
        comisionManager1: comisionManager1 || existingCoordinator.comisionManager1,
        comisionManager2: comisionManager2 || existingCoordinator.comisionManager2,
        comisionManager3: comisionManager3 || existingCoordinator.comisionManager3,
      },
    });

    res.status(200).json(updatedCoordinator);
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

module.exports = updateCoordinator;