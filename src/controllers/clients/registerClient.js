const { parse, format } = require('date-fns');
const prisma = require("../../db");

const registerClient = async (req, res) => {
  const { nombre, apellido, tipo_persona, cuit, fecha_inicio_actividades, direccion, codigo_postal, provincia, localidad, telefono, email, fecha_creacion, observacion, asesor_id, manager_id, coordinador_id, compania_1, compania_2, compania_3, compania_4, compania_5, compania_6, numero_cuenta_1, numero_cuenta_2, numero_cuenta_3, numero_cuenta_4, numero_cuenta_5, numero_cuenta_6 } = req.body;

  try {
    if (!nombre || typeof nombre !== 'string') {
      return res.status(400).json({ message: 'Nombre inválido' });
    }

    const fechaInicioActividadesString = fecha_inicio_actividades;
    const fechaInicioActividades = parse(fechaInicioActividadesString, 'yyyy-MM-dd', new Date());
    const fechaInicioActividadesISO = format(fechaInicioActividades, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

      const fechaCreacion = new Date();
      const clientes = [];

      for (let i = 1; i <= 6; i++) {
        const numero_cuenta = req.body[`numero_cuenta_${i}`];
        const compania = req.body[`compania_${i}`];

        if (numero_cuenta && compania) {
          const cliente = await prisma.cliente.create({
            data: { 
              nombre, 
              apellido, 
              tipo_persona, 
              cuit, 
              fecha_inicio_actividades: fechaInicioActividadesISO, 
              direccion, 
              codigo_postal, 
              provincia, 
              localidad, 
              telefono, 
              email, 
              numero_cuenta,
              compania,
              fecha_creacion: fechaCreacion, 
              observacion 
            },
          });

          const relacion = await prisma.relacion_cliente_asesor.create({
            data: {
              cliente_id: cliente.id,
              asesor_id,
              manager_id,
              coordinador_id
            }
          });

          clientes.push({ cliente, relacion });
        }
      }

      res.json(clientes);
    
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

module.exports = registerClient;