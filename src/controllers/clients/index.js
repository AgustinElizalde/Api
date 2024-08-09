const registerClient = require('./registerClient');
const getAllClients = require('./getAllClients');
const loginClient = require('./getClient');
const deleteClient = require('./deleteClients');
const updateClient = require('./updateClient');
const clienteAsesor = require('./clienteAsesor');
const getAll = require('./getAllAsesors');


module.exports = {
  registerClient,
  getAllClients,
  loginClient,
  deleteClient,
  updateClient,
  clienteAsesor,
  getAll
};