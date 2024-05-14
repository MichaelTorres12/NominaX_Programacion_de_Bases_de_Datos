const { getConnection, mssql } = require('../db/conexionDB.js');

const encontrarUsuarioPorCredenciales = async (nombreUsuario, contrasena) => {
    const pool = await getConnection();
    const resultado = await pool.request()
        .input('nombreUsuario', mssql.NVarChar, nombreUsuario)
        .input('contrasena', mssql.NVarChar, contrasena)
        .query('SELECT * FROM Usuario WHERE NombreUsuario = @nombreUsuario AND Contrasena = @contrasena');
    return resultado.recordset[0];
};

module.exports = { encontrarUsuarioPorCredenciales };
