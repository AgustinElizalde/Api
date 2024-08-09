const { Router } = require("express");
const router = Router();
const coordinatorControllers = require('../controllers/coordinadores');


//  router.get("/", ServicesControllers.getAllPackages);
//  router.get("/:id", ServicesControllers.getPackageById);
router.post("/create", coordinatorControllers.registerCoordinator);
router.put("/update/:id", coordinatorControllers.updateCoordinator);
//   router.delete("/delete/:id", ServicesControllers.deletePackage);
 //TODO: añadir endpoint que permita traer servicios por un filtro en la descripcion

module.exports = router;