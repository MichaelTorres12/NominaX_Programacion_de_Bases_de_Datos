//Importamos el modelo de Usuarios
const empleado = require('../../modelos/Empleado.js');

exports.controlEmpleado = async (req, res) => {
    try {
        const controlEMpleado = await empleado.controlEmpleados();
        if (!controlEMpleado) {
            return res.status(401).json({ mensaje: 'No hay empleados en la base de datos' });
        }else {
            return res.status(200).json(controlEMpleado);
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
};


exports.insertEmpleados = async (req, res) => {
    const { nombres, apellido, tituloPuesto, direccion, numeroTel,email,fechaNacimiento,estadoCivil,numSeguridadSocial,idEquipo,idDepartamento } = req.body;
    try {
        const empleadoInsert = await empleado.insertEmpleados(nombres, apellido, tituloPuesto, direccion, numeroTel,email,fechaNacimiento,estadoCivil,numSeguridadSocial,idEquipo,idDepartamento);
        if (!empleadoInsert) {
            return res.status(401).json({ mensaje: 'Hubo algun error' });
        }else {
            return res.status(200).json(empleadoInsert);
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
}

exports.EliminarEmpleadoDetalles = async (req, res) => {
    const {id} = req.params;
    try {
        const empleadoDeleted = await empleado.eliminatEmpleado(id);
        if (!empleadoDeleted) {
            return res.status(200).json(empleadoDeleted);
        }else {
            return res.status(401).json({ mensaje: 'Hubo algun error' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
}


exports.actualilzarEmpleado = async (req, res) => {
    const {id} = req.params;
    const { nombres, apellido, tituloPuesto, direccion, numeroTel,email,fechaNacimiento,estadoCivil,numSeguridadSocial,idEquipo,idDepartamento } = req.body;
    try {
        const empleadoInsert = await empleado.actualizarEmpleado(id, nombres, apellido, tituloPuesto, direccion, numeroTel,email,fechaNacimiento,estadoCivil,numSeguridadSocial,idEquipo,idDepartamento);
        if (!empleadoInsert) {
            return res.status(401).json({ mensaje: 'Hubo algun error' });
        }else {
            return res.status(200).json(empleadoInsert);
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
}
