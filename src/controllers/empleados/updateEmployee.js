const prisma = require("../../db");

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    apellido,
    direccion,
    nacionalidad,
    celular,
    email,
    password,
    cargo,
    sueldo,
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
    const existingEmployee = await prisma.empleados.findFirst({ where: { id_empleado: Number(id) } });

    if (!existingEmployee) {
      return res.status(404).json({ message: 'No se encontró ningún empleado con ese ID' });
    }

    const updatedEmployee = await prisma.empleados.update({
      where: { id_empleado: Number(id) },
      data: {
        nombre: nombre || existingEmployee.nombre,
        apellido: apellido || existingEmployee.apellido,
        direccion: direccion || existingEmployee.direccion,
        nacionalidad: nacionalidad || existingEmployee.nacionalidad,
        celular: celular || existingEmployee.celular,
        email: email || existingEmployee.email,
        password: password || existingEmployee.password,
        cargo: cargo || existingEmployee.cargo,
        sueldo: sueldo || existingEmployee.sueldo,
        comisionEmpresa1: comisionEmpresa1 || existingEmployee.comisionEmpresa1,
        comisionEmpresa2: comisionEmpresa2 || existingEmployee.comisionEmpresa2,
        comisionEmpresa3: comisionEmpresa3 || existingEmployee.comisionEmpresa3,
        comisionCoordinador1: comisionCoordinador1 || existingEmployee.comisionCoordinador1,
        comisionCoordinador2: comisionCoordinador2 || existingEmployee.comisionCoordinador2,
        comisionCoordinador3: comisionCoordinador3 || existingEmployee.comisionCoordinador3,
        comisionManager1: comisionManager1 || existingEmployee.comisionManager1,
        comisionManager2: comisionManager2 || existingEmployee.comisionManager2,
        comisionManager3: comisionManager3 || existingEmployee.comisionManager3,
      },
    });

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateEmployee;