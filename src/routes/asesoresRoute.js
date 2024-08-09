const { Router } = require("express");
const router = Router();
const employeesControllers = require('../controllers/empleados');

 router.get("/", employeesControllers.getAllEmployees);
 router.get("/login", employeesControllers.loginEmployee);
router.post("/register", employeesControllers.registerEmployee);
 router.put("/update/:id", employeesControllers.updateEmployee);
 router.delete("/delete/:id", employeesControllers.deleteEmployee);
 router.post("/asesor-coordinador", employeesControllers.asesorCoordinador);

module.exports = router;