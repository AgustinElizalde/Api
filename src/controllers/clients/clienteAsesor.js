const prisma = require("../../db");

const clienteAsesor = async (req, res) => {
  const { id_asesor, id_cliente, id_coordinador, id_manager } = req.body;

  try {
    let data = { cliente_id: id_cliente };

    if (id_asesor) {
      data.asesor_id = id_asesor;
    } else if (id_coordinador) {
      data.coordinador_id = id_coordinador;
    } else if (id_manager) {
      data.manager_id = id_manager;
    }

   const relation = await prisma.relacion_cliente_asesor.create({
      data: data,
    });

    res.status(200).json({ message: 'Cliente relacionado con éxito', relation  });
  } catch (error) {
    if (error.message.includes('Foreign key constraint failed')) {
        return res.status(404).json({ message: 'Uno de los dos ID no es de un usuario registrado en el sistema.' });
      }
    res.status(500).json({ error: error.message });
  }
};

module.exports = clienteAsesor;