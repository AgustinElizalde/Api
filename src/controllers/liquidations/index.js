const createArancelesFromExcel = require("./createArancel");
const createLiquidacion = require("./createLiquidation");
const getArancelesPuByLiquidacion = require("./getAllArancelesPu");
const getFondosByLiquidacion = require("./getAllFondos");
const getAllLiquidationsByPeriod = require("./getAllLiquidation");
const updateLiquidacion = require("./updateLiquidation");
const getArancelesByLiquidacion = require("./getAllArancelesForAsesor");
const createArancelesPuFromExcel = require("./createArancelPu");
const createFondosFromExcel = require("./createFondos");
const getArchivosByLiquidacion = require("./getAllArchivosToAsesor");
const getTotalByLiquidacion = require("./getTotalForAsesor");
const { getArancelesFromPeriodo, getArancelesPublicosFromPeriodo, getFondosFromPeriodo } = require('./getAllArancelesBPeriods');
const deleteArancelesPublicosFromPeriodo = require("./deleteAllArancelP");
const deleteFondosFromPeriodo = require("./deleteAllFondos");
const deleteArancelesFromPeriodo = require("./deleteAllArancel");

module.exports = {
    deleteArancelesFromPeriodo,
    deleteFondosFromPeriodo,
    deleteArancelesPublicosFromPeriodo,
    createFondosFromExcel,
    getTotalByLiquidacion,
    getArchivosByLiquidacion,
    createArancelesPuFromExcel,
    getArancelesByLiquidacion,
    getFondosByLiquidacion,
    getArancelesPuByLiquidacion,
    updateLiquidacion,
    createLiquidacion,
    createArancelesFromExcel,
    getAllLiquidationsByPeriod,
    getArancelesFromPeriodo, 
    getArancelesPublicosFromPeriodo, 
    getFondosFromPeriodo
}