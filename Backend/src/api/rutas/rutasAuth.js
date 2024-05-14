const express = require('express');
const router = express.Router();
const authController = require('../controladores/controladorAuth.js');
<<<<<<< HEAD

=======
const Usuario = require('../../modelos/Usuario.js');

// Ruta para iniciar sesión
>>>>>>> 89ccf9956dbf5cb309b99eb93559b703104657a5
router.post('/login', authController.login);

module.exports = router;
