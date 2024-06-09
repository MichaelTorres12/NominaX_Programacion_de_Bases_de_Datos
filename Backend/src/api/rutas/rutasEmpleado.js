const express = require('express');
const router = express.Router();
const empleados = require('../controladores/controladorEmpleado.js');
const departamento = require('../controladores/controladorDepartamento.js');
const equipo = require('../controladores/controladorEquipo.js');
const asistencia = require('../controladores/controladorRegistroAsistencia.js');
const nomina = require('../controladores/controladorNomina.js');

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

//EQUIPO
router.get('/equipo', equipo.getEquipo);
router.get('/equipo/:id', equipo.obtenerEquipo);
router.post('/equipo', equipo.insertEquipo);
router.delete('/equipo/:id', equipo.eliminarEquipo)
router.patch('/equipo/:id', equipo.actualilzarEquipo)

//Asistencias
router.get('/asistencia', asistencia.getAsistencias);
router.post('/asistencia', asistencia.insertAsistencia);


//NOMINAS
router.get('/nomina', nomina.getNomina);
router.get('/nomina/:id', nomina.obtenerNomina);
router.post('/nomina', nomina.insertNomina);
router.delete('/nomina/:id', nomina.eliminarNomina)
router.patch('/nomina/:id', nomina.actualilzarNomina)

module.exports = router;
