const { getConnection, mssql } = require('../db/conexionDB.js');

const registroAsistencia = async () => {
    const pool = await getConnection();
    const resultado = await pool.request()
        .query('Select * from VistaAsistenciaConJustificaciones');
    // console.log(resultado);
    return resultado.recordset;
}


const insertarAsistencia = async (id_empleado, tipo_jornada, tipo_incidencia, descripcion_incidencia, estado_incidencia, descripcion_justificacion, documento, estado_aprobacion) => {
    const pool = await getConnection();
    const resultado = await pool.request()
        .input('ID_Empleado', id_empleado)
        .input('Tipo_Jornada', tipo_jornada)
        .input('Tipo_Incidencia', tipo_incidencia)
        .input('Descripcion_Incidencia', descripcion_incidencia)
        .input('Estado_Incidencia', estado_incidencia)
        .input('Descripcion_Justificacion', descripcion_justificacion)
        .input('Documento_Adjunto', documento)
        .input('Estado_Aprobacion', estado_aprobacion)
        .execute(`dbo.InsertarRegistroAsistencia`);
    console.log(resultado);
    return resultado;
}



module.exports = { registroAsistencia, insertarAsistencia};