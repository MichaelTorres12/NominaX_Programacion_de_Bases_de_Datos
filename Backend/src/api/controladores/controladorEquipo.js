//Importamos el modelo de Usuarios
const equipo = require('../../modelos/Equipo.js');

exports.getEquipo = async (req, res) => {
    try {
        const resultadoEquipo = await equipo.getEquipo();
        if (!resultadoEquipo) {
            return res.status(401).json({ mensaje: 'No hay empleados en la base de datos' });
        }else {
            return res.status(200).json(resultadoEquipo);
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
};


exports.insertEquipo = async (req, res) => {
    const { nombres, descripcion, id_departamento } = req.body;
    try {
        const resultadoEquipo = await equipo.insertarEquipo(nombres, descripcion, id_departamento);
        if (!resultadoEquipo) {
            return res.status(401).json({ mensaje: 'Hubo algun error' });
        }else {
            return res.status(200).json(resultadoEquipo.recordset);
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
}

exports.eliminarEquipo = async (req, res) => {
    const {id} = req.params;
    try {
        const resultadoEquipo = await equipo.eliminarEquipo(id);
        if (!resultadoEquipo) {
            return res.status(401).json({ mensaje: 'Hubo algun error' });
        }else {
            return res.status(200).json(resultadoEquipo.recordset);
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
}


exports.actualilzarEquipo = async (req, res) => {
    const {id} = req.params;
    const { nombres, descripcion, id_departamento } = req.body;
    try {
        const resultadoEquipo = await equipo.actualizarEquipo(id, nombres, descripcion, id_departamento);
        if (!resultadoEquipo) {
            return res.status(401).json({ mensaje: 'Hubo algun error' });
        }else {
            return res.status(200).json(resultadoEquipo.recordset);
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
}

exports.obtenerEquipo = async (req, res) => {
    const {id} = req.params;
    try {
        const resultadoEquipo = await equipo.obtenerEquipo(id)
        if (!resultadoEquipo) {
            return res.status(401).json({ mensaje: 'Hubo algun error' });
        }else {
            return res.status(200).json(resultadoEquipo);
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
}