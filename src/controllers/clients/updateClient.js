const prisma = require("../../db");

const { parse, format } = require('date-fns');

const updateClient = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, tipo_persona, cuit, fecha_inicio_actividades, direccion, codigo_postal, provincia, localidad, telefono, email, compania, numero_cuenta, observacion } = req.body;

  try {
    const existingClient = await prisma.cliente.findUnique({ where: { id_cliente: Number(id) } });

    if (!existingClient) {
      return res.status(404).json({ message: 'No se encontró ningún cliente con ese ID' });
    }

    const fechaInicioActividadesString = fecha_inicio_actividades; // Tu fecha en formato dd/mm/yyyy
    const fechaInicioActividades = parse(fechaInicioActividadesString, 'dd/MM/yyyy', new Date());
    const fechaInicioActividadesISO = format(fechaInicioActividades, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

    const updatedClient = await prisma.cliente.update({
      where: { id_cliente: Number(id) },
      data: {
        nombre: nombre || existingClient.nombre,
        apellido: apellido || existingClient.apellido,
        tipo_persona: tipo_persona || existingClient.tipo_persona,
        cuit: cuit || existingClient.cuit,
        fecha_inicio_actividades: fechaInicioActividadesISO || existingClient.fecha_inicio_actividades,
        direccion: direccion || existingClient.direccion,
        codigo_postal: codigo_postal || existingClient.codigo_postal,
        provincia: provincia || existingClient.provincia,
        localidad: localidad || existingClient.localidad,
        telefono: telefono || existingClient.telefono,
        email: email || existingClient.email,
        compania: compania || existingClient.compania,
        numero_cuenta: numero_cuenta || existingClient.numero_cuenta,
        observacion: observacion || existingClient.observacion
      },
    });

    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateClient;