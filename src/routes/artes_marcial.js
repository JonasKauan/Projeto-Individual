var express = require("express");
var router = express.Router();

var arteMarcialController = require("../controllers/arte_marcialController");

router.get("/", function (req, res) {
    arteMarcialController.testar(req, res);
});

router.get("/listar", function (req, res) {
    arteMarcialController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de arteMarcialController.js
router.post("/cadastrar", function (req, res) {
    arteMarcialController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    arteMarcialController.entrar(req, res);
});

module.exports = router;