const createTeam = require("./createTeam");
const getAllCompanysManagers = require("./getAllCompanysTeams");
const getAllTeams = require("./getAllTeams");
const getTeams = require("./getTeams");
const updateTeam = require("./updateTeams");
const getManagerCoordinators = require("./getCoordinators");
module.exports = {
    createTeam,
    getTeams,
    updateTeam,
    getAllCompanysManagers,
    getAllTeams,
    getManagerCoordinators
}