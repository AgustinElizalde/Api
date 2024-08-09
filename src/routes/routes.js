const { Router } = require("express");
const healthRoutes = require("./healthRoute");
const clientRoutes = require("./clientsRoute");
const employeeRoutes = require("./asesoresRoute");
const coordinatorRoute = require("./coordinadoresRoute");
const managerRoute = require("./managersRoute");
const companyRoute = require("./companyRoute");
const teamsRoute = require("./teamsRoute");
const periodRoute = require("./periodRoute");
const liquidationRoute = require("./liquidationRoute");
const router = Router();

router.use("/health", healthRoutes);
router.use("/clients", clientRoutes);
router.use("/asesor", employeeRoutes);
router.use("/coordinadores", coordinatorRoute);
router.use("/manager", managerRoute);
router.use("/company", companyRoute);
router.use("/teams", teamsRoute);
router.use("/period", periodRoute);
router.use("/liquidation", liquidationRoute);


module.exports = router;
