const express = require('express');
const router = express.Router();

const UsuarioSDBController = require('../controllers/usuarioSDBController')

router.get('/', UsuarioSDBController.getUsuarioSDB);
router.post('/', UsuarioSDBController.postUsuarioSDB );

module.exports= router;