const prisma = require("../db");

const obtenerRelaciones = async (id, rol) => {
  try {
	let relaciones = {};

	if (rol === 'asesor') {
	  let relacion = await prisma.asesor_manager.findFirst({
		where: { asesor_id: parseInt(id) },
		include: {
		  manager: true
		}
	  });
	  if (relacion && relacion.manager) {
		relaciones.manager = relacion.manager;
	  }

	  relacion = await prisma.asesor_coordinador.findFirst({
		where: { asesor_id: parseInt(id) },
		include: {
		  coordinador: true
		}
	  });
	  if (relacion && relacion.coordinador) {
		relaciones.coordinador = relacion.coordinador;
	  }
	} else if (rol === 'coordinador') {
	
	  const relacion = await prisma.asesor_manager.findFirst({
		where: { coordinador_id: parseInt(id) },
		include: {
		  manager: true
		}
	  });
	  if (relacion && relacion.manager) {
		relaciones.manager = relacion.manager;
	  }
	} else {
	  return "Es manager";
	}

	return relaciones;
  } catch (error) {
	console.error("Error al obtener relaciones:", error);
	throw error; 
  }
};

module.exports = obtenerRelaciones;