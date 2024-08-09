const prisma = require("../db");
const getRelacionId = async function getRelacionId(numero_cuenta, periodo_id) {
    const relacion = await prisma.relacion_cliente_asesor.findFirst({
      where: {
        cliente: {
          numero_cuenta: numero_cuenta
        },

      }
    });
  
    if (!relacion) {
      throw new Error(`No se encontró una relación para el número de cuenta ${numero_cuenta} y el período ${periodo_id}`);
    }
  
    return relacion.id;
}

module.exports = getRelacionId;