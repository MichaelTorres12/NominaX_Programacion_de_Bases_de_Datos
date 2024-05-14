const express = require('express');
const router = express.Router();
const authController = require('../controladores/controladorAuth.js');

router.post('/login', authController.login);

module.exports = router;
