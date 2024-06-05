//Importamos el modelo de Usuarios
const departamento = require('../../modelos/Departamento.js');

exports.getDepartamento = async (req, res) => {
    try {
        const resultadoDepartamento = await departamento.getDepartamento();
        if (!resultadoDepartamento) {
            return res.status(401).json({ mensaje: 'No hay empleados en la base de datos' });
        }else {
            return res.status(200).json(resultadoDepartamento);
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
};


exports.insertDepartamento = async (req, res) => {
    const { nombres, descripcion, ubicacion } = req.body;
    try {
        const resultadoDepartamento = await departamento.insertarDepartamento(nombres, descripcion, ubicacion);
        if (!resultadoDepartamento) {
            return res.status(401).json({ mensaje: 'Hubo algun error' });
        }else {
            return res.status(200).json(resultadoDepartamento.recordset);
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
}

exports.eliminarDepartamento = async (req, res) => {
    const {id} = req.params;
    try {
        const resultadoDepartamento = await departamento.eliminatDepartamento(id);
        if (!resultadoDepartamento) {
            return res.status(401).json({ mensaje: 'Hubo algun error' });
        }else {
            return res.status(200).json(resultadoDepartamento);
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
}


exports.actualilzarDepartamento = async (req, res) => {
    const {id} = req.params;
    const { nombres, descripcion, ubicacion } = req.body;
    try {
        const resultadoDepartamento = await departamento.actualizarDepartamento(id, nombres, descripcion, ubicacion);
        if (!resultadoDepartamento) {
            return res.status(401).json({ mensaje: 'Hubo algun error' });
        }else {
            return res.status(200).json(resultadoDepartamento.recordset);
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
}

exports.obtenerDepartamento = async (req, res) => {
    const {id} = req.params;
    try {
        const resultadoDepartamento = await departamento.obtenerDepartamento(id)
        if (!resultadoDepartamento) {
            return res.status(401).json({ mensaje: 'Hubo algun error' });
        }else {
            return res.status(200).json(resultadoDepartamento);
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
}