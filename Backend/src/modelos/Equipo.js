const { getConnection, mssql } = require('../db/conexionDB.js');

const getEquipo = async () => {
    const pool = await getConnection();
    const resultado = await pool.request()
        .query('SELECT * FROM VistaEquiposConInformacion ORDER BY ID');
    // console.log(resultado);
    return resultado.recordset;
};


const insertarEquipo = async (nombres, descripcion, id_departamento) => {
    const pool = await getConnection();
    const resultado = await pool.request()
        .input('Nombre', nombres)
        .input('Descripcion', descripcion)
        .input('ID_Departamento', id_departamento)
        .execute(`dbo.InsertarEquipo`);
    console.log(resultado);
    return resultado;
}


const eliminarEquipo = async(id) => {
    const pool = await getConnection();
    const resultado = await pool.request()
        .input("ID_Equipo", id)
        .execute('dbo.EliminarEquipo')
    return resultado;
}


const actualizarEquipo = async (id, nombres, descripcion, id_departamento) => {
    const pool = await getConnection();
    const resultado = await pool.request()
        .input('ID_Equipo', id)
        .input('Nombre', nombres)
        .input('Descripcion', descripcion)
        .input('ID_Departamento', id_departamento)
        .execute(`dbo.ActualizarEquipo`);
    console.log(resultado);
    return resultado;
}


const obtenerEquipo = async (id) => {
    const pool = await getConnection();
    const resultado = await pool.request()
        .input('ID_Equipo', id)
        .execute(`dbo.ObtenerEquipoPorID`);
    console.log(resultado);
    return resultado.recordset;
}

module.exports = { getEquipo, insertarEquipo, eliminarEquipo, actualizarEquipo, obtenerEquipo };