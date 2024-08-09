const { Router } = require("express");
const router = Router();
const periodControllers = require('../controllers/periodos');

  router.get("/company/:compa_ia_id", periodControllers.getPeriodsByCompanyId);
//  router.get("/login", employeesControllers.loginEmployee); //TODO: añadir JWT para autenticación 
 router.post("/create", periodControllers.createPeriodo);
//   router.put("/update/:id", periodControllers.updateManager);
//  router.delete("/delete/:id", employeesControllers.deleteEmployee);

module.exports = router;