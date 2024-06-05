const { getConnection, mssql } = require('../db/conexionDB.js');

const getDepartamento = async () => {
    const pool = await getConnection();
    const resultado = await pool.request()
        .execute('dbo.ObtenerInfoDepartamentos');
    // console.log(resultado);
    return resultado.recordset;
};


const insertarDepartamento = async (nombres, descripcion, ubicacion) => {
    const pool = await getConnection();
    const resultado = await pool.request()
        .input('Nombre', nombres)
        .input('Descripcion', descripcion)
        .input('Ubicacion', ubicacion)
        .execute(`dbo.CrearDepartamento`);
    console.log(resultado);
    return resultado;
}


const eliminatDepartamento = async(id) => {
    const pool = await getConnection();
    const resultado = await pool.request()
        .input("ID_Departamento", id)
        .execute('dbo.EliminarDepartamento')
    return resultado;
}


const actualizarDepartamento = async (id, nombres, descripcion, ubicacion) => {
    const pool = await getConnection();
    const resultado = await pool.request()
        .input('ID_Departamento', id)
        .input('Nombre', nombres)
        .input('Descripcion', descripcion)
        .input('Ubicacion', ubicacion)
        .execute(`dbo.ActualizarDepartamento`);
    console.log(resultado);
    return resultado;
}


const obtenerDepartamento = async (id) => {
    const pool = await getConnection();
    const resultado = await pool.request()
        .input('ID_Departamento', id)
        .execute(`dbo.ObtenerDepartamentoPorID`);
    console.log(resultado);
    return resultado.recordset;
}

module.exports = { getDepartamento, insertarDepartamento, eliminatDepartamento, actualizarDepartamento, obtenerDepartamento };