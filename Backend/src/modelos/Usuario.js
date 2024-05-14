<<<<<<< HEAD
const { getConnection, mssql } = require('../db/conexionDB.js');

=======
//Modelo para el login de usuarios
const { getConnection, mssql } = require('../db/conexionDB');

//Funcion asincrona que pasa los parametros de nombreUsuario y contrasena al controlador, usando un pool de conexiones para hacer la solicitud a la DB
>>>>>>> 89ccf9956dbf5cb309b99eb93559b703104657a5
const encontrarUsuarioPorCredenciales = async (nombreUsuario, contrasena) => {
    const pool = await getConnection();
    const resultado = await pool.request()
        .input('nombreUsuario', mssql.NVarChar, nombreUsuario)
        .input('contrasena', mssql.NVarChar, contrasena)
        .query('SELECT * FROM Usuario WHERE NombreUsuario = @nombreUsuario AND Contrasena = @contrasena');
    return resultado.recordset[0];
};

module.exports = { encontrarUsuarioPorCredenciales };
