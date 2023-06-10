var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/", function (req, res) {
    medidaController.testar(req, res);
});

router.get("/ultimas/:idAquario", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idAquario", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
});

router.get("/altura/:idUsuario", function (req, res) {
    medidaController.listarAltura(req, res);
})

router.get("/peso/:idUsuario", function (req, res) {
    medidaController.listarPeso(req, res);
})

router.get("/praticantes", function (req, res) {
    medidaController.listarPraticantes(req, res);
})

module.exports = router;