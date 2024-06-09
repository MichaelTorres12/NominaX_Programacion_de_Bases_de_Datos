// Importamos el modelo de Asistencia
const asistencias = require('../../modelos/RegistroAsistencia.js');

exports.getAsistencias = async (req, res) => {
    try {
        const resultadoAsistencias = await asistencias.registroAsistencia();
        if (!resultadoAsistencias) {
            return res.status(401).json({ mensaje: 'No hay asistencias en la base de datos' });
        } else {
            return res.status(200).json(resultadoAsistencias);
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
};

exports.insertAsistencia = async (req, res) => {
    const { id_empleado, fecha, hora_entrada, hora_salida, tipo_asistencia } = req.body;
    try {
        const resultadoAsistencias = await asistencias.insertarAsistencia(id_empleado, fecha, hora_entrada, hora_salida, tipo_asistencia);
        if (!resultadoAsistencias) {
            return res.status(401).json({ mensaje: 'Hubo algun error' });
        } else {
            return res.status(200).json(resultadoAsistencias.recordset);
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
};
