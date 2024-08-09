const { Router } = require("express");
const router = Router();
const liquidacionesControllers = require('../controllers/liquidations');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }).single('excelFile');


router.post("/upload/arancel", upload, liquidacionesControllers.createArancelesFromExcel);
router.post("/upload/fondos", upload, liquidacionesControllers.createFondosFromExcel);
router.post("/upload/arancel-pu", upload, liquidacionesControllers.createArancelesPuFromExcel);
  router.post("/create/liquidation", liquidacionesControllers.createLiquidacion);
  router.put("/update/liquidation", liquidacionesControllers.updateLiquidacion);
  router.get("/period/:periodo_id", liquidacionesControllers.getAllLiquidationsByPeriod);
  router.get("/fondos/:periodo_id/:id/:rol", liquidacionesControllers.getFondosByLiquidacion);
  router.get("/aranceles/:periodo_id/:id/:rol", liquidacionesControllers.getArancelesByLiquidacion);
  router.get("/aranceles-pu/:periodo_id/:id/:rol", liquidacionesControllers.getArancelesPuByLiquidacion);
  router.get("/archivos/:periodo_id/:id/:rol", liquidacionesControllers.getArchivosByLiquidacion);
  router.get("/total/:periodo_id/:id/:rol", liquidacionesControllers.getTotalByLiquidacion);
  router.get("/aranceles-period/:periodoId", liquidacionesControllers.getArancelesFromPeriodo);
  router.get("/aranceles-publicos-period/:periodoId", liquidacionesControllers.getArancelesPublicosFromPeriodo);
  router.get("/fondos-period/:periodoId", liquidacionesControllers.getFondosFromPeriodo);
  router.delete("/delete/aranceles/:periodoId", liquidacionesControllers.deleteArancelesFromPeriodo);
  router.delete("/delete/fondos/:periodoId", liquidacionesControllers.deleteFondosFromPeriodo);
  router.delete("/delete/aranceles-pu/:periodoId", liquidacionesControllers.deleteArancelesPublicosFromPeriodo);


module.exports = router;