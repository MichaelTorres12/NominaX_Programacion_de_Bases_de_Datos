const express = require('express');
const router = express.Router();
const empleados = require('../controladores/controladorEmpleado.js');

router.get('/empleados', empleados.controlEmpleado);
router.get('/empleados/:id', empleados.obtenerEmpleado);
router.post('/empleados', empleados.insertEmpleados);
router.delete('/empleados/:id', empleados.EliminarEmpleadoDetalles)
router.patch('/empleados/:id', empleados.actualilzarEmpleado)

module.exports = router;
