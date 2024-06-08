//Importamos el modelo de Usuarios
const asistencias = require('../../modelos/RegistroAsistencia.js');

exports.getAsistencias = async (req, res) => {
    try {
        const resultadoAsistencias = await asistencias.registroAsistencia();
        if (!resultadoAsistencias) {
            return res.status(401).json({ mensaje: 'No hay asistencias en la base de datos' });
        }else {
            return res.status(200).json(resultadoAsistencias);
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
};


exports.insertAsistencia = async (req, res) => {
    const { id_empleado, tipo_jornada, tipo_incidencia, descripcion_incidencia, estado_incidencia, descripcion_justificacion, documento, estado_aprobacion } = req.body;
    try {
        const resultadoAsistencias = await asistencias.insertarAsistencia(id_empleado, tipo_jornada, tipo_incidencia, descripcion_incidencia, estado_incidencia, descripcion_justificacion, documento, estado_aprobacion);
        if (!resultadoAsistencias) {
            return res.status(401).json({ mensaje: 'Hubo algun error' });
        }else {
            return res.status(200).json(resultadoAsistencias.recordset);
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
}
