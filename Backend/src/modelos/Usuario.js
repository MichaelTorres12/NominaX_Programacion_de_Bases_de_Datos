//Modelo para el login de usuarios
const { getConnection, mssql } = require('../db/conexionDB');

//Funcion asincrona que pasa los parametros de nombreUsuario y contrasena al controlador, usando un pool de conexiones para hacer la solicitud a la DB
const encontrarUsuarioPorCredenciales = async (nombreUsuario, contrasena) => {
    const pool = await getConnection();
    const resultado = await pool.request()
        .input('nombreUsuario', mssql.NVarChar, nombreUsuario)
        .input('contrasena', mssql.NVarChar, contrasena)
        .query('SELECT * FROM Usuario WHERE NombreUsuario = @nombreUsuario AND Contrasena = @contrasena');
    return resultado.recordset[0];
};

module.exports = { encontrarUsuarioPorCredenciales };
