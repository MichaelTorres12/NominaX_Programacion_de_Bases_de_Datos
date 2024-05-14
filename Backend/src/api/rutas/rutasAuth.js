const express = require('express');
const router = express.Router();
const authController = require('../controladores/controladorAuth.js');
const Usuario = require('../../modelos/Usuario.js');

// Ruta para iniciar sesión
router.post('/login', authController.login);

module.exports = router;
