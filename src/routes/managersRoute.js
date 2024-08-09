const { Router } = require("express");
const router = Router();
const managerControllers = require('../controllers/managers');

//  router.get("/", employeesControllers.getAllEmployees);
//  router.get("/login", employeesControllers.loginEmployee); //TODO: añadir JWT para autenticación 
 router.post("/register", managerControllers.registerManager);
  router.put("/update/:id", managerControllers.updateManager);
//  router.delete("/delete/:id", employeesControllers.deleteEmployee);

module.exports = router;