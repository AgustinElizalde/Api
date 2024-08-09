const { Router } = require("express");
const router = Router();
const teamsControllers = require('../controllers/teams');

//  router.get("/", employeesControllers.getAllEmployees);
//  router.get("/login", employeesControllers.loginEmployee); //TODO: añadir JWT para autenticación 
  router.post("/create", teamsControllers.createTeam);
  router.get("/search/:id", teamsControllers.getTeams);
  router.get("/update", teamsControllers.updateTeam);
  router.get("/all/:nombre", teamsControllers.getAllCompanysManagers);
  router.get("/coordinadores/:id", teamsControllers.getManagerCoordinators);
  router.get("/all", teamsControllers.getAllTeams)


//   router.put("/update/:id", managerControllers.updateManager);
//  router.delete("/delete/:id", employeesControllers.deleteEmployee);

module.exports = router;