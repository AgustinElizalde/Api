const prisma = require("../db");
async function getAsesorFromRelacion(relacion_id) {
  const relacion = await prisma.relacion_cliente_asesor.findFirst({
    where: {
      id: relacion_id
    },
    include: {
      asesor: true,
      coordinador: true,
      manager: true
    }
  });

  if (!relacion) {
    throw new Error(`No se encontró una relación para el id ${relacion_id}`);
  }

  if (relacion.asesor) {
    return { id: relacion.asesor.id, rol: 'asesor' };
  } else if (relacion.coordinador) {
    return { id: relacion.coordinador.id, rol: 'coordinador' };
  } else if (relacion.manager) {
    return { id: relacion.manager.id, rol: 'manager' };
  }
}

module.exports = getAsesorFromRelacion;