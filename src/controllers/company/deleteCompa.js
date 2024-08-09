const prisma = require("../../db");

const deleteAllCompanies = async () => {
  try {
    // Primero, elimina o actualiza los registros en la tabla `periodos` que hacen referencia a las empresas
    await prisma.periodos.deleteMany({

    });

    // Luego, elimina todas las empresas
    await prisma.empresa.deleteMany();
    console.log('Todas las empresas han sido eliminadas.');
  } catch (error) {
    console.error('Error al eliminar las empresas: ', error);
  }
};

deleteAllCompanies();