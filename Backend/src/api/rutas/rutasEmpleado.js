const express = require('express');
const router = express.Router();
const empleados = require('../controladores/controladorEmpleado.js');
const departamento = require('../controladores/controladorDepartamento.js');

router.get('/empleados', empleados.controlEmpleado);
router.get('/empleados/:id', empleados.obtenerEmpleado);
router.post('/empleados', empleados.insertEmpleados);
router.delete('/empleados/:id', empleados.EliminarEmpleadoDetalles)
router.patch('/empleados/:id', empleados.actualilzarEmpleado)

//DEPARTAMENTO
router.get('/departamento', departamento.getDepartamento);
router.get('/departamento/:id', departamento.obtenerDepartamento);
router.post('/departamento', departamento.insertDepartamento);
router.delete('/departamento/:id', departamento.eliminarDepartamento)
router.patch('/departamento/:id', departamento.actualilzarDepartamento)


module.exports = router;
