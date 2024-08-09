const { Router } = require("express");
const router = Router();
const companyControllers = require('../controllers/company');

//  router.get("/", employeesControllers.getAllEmployees);
//  router.get("/login", employeesControllers.loginEmployee); //TODO: añadir JWT para autenticación 
  router.post("/create", companyControllers.createCompany);
  router.post("/employees/:nombre", companyControllers.getEmployees);
  router.get("/all", companyControllers.getAll);
//   router.put("/update/:id", managerControllers.updateManager);
//  router.delete("/delete/:id", employeesControllers.deleteEmployee);

module.exports = router;