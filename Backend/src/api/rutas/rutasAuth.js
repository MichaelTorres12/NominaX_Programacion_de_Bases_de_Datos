const express = require('express');
const router = express.Router();
const authController = require('../controladores/controladorAuth');

router.post('/login', authController.login);

module.exports = router;
