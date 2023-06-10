var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

router.get("/peso", function (req, res) {
    usuarioController.listarPeso(req, res);
});

router.get("/altura", function (req, res) {
    usuarioController.listarAltura(req, res);
});

router.get("/contar", function (req, res) {
    usuarioController.contar(req, res);
});

router.get("/categoria", function (req, res) {
    usuarioController.contarCategoria(req, res);
});

router.get("/pontuacaoMedia", function (req, res) {
    usuarioController.pegarPontuacaoMedia(req, res);
});

router.get("/pontuacaoCategoria", function (req, res) {
    usuarioController.pontuacaoMediaCategoria(req, res);
});

router.get("/ranking", function (req, res) {
    usuarioController.ranking(req, res);
});

router.get("/media", function (req, res) {
    usuarioController.media(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.put("/cadastrarPontuacao/:idUsuario", function (req, res) {
    usuarioController.cadastrarPontuacao(req, res);
});

router.put("/cadastrarCategoria", function (req, res) {
    usuarioController.cadastrarCategoria(req, res);
});

module.exports = router;