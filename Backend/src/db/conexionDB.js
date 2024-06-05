//Para poder usar el mssql primero deberian de instalan la dependencia, en la TERMINAL.
/*
En la terminal entran a la carpeta de Backend: PS C:\Users\Michael Torres\Desktop\NominaX_BasesDeDatos\Backend>
y ponen: npm i mssql
y le dan enter
*/

//import mssql from 'mssql'; //Esto es para cuando se usa model en el type.

const mssql = require('mssql');
require('dotenv').config();

// Aquí cambian los datos por los de sus credenciales
const connectionSettings = {
    server: "localhost",
    database: "NominaXDataBase",
    user: "sa",
    password: process.env.DB_PASSWORD,
    options: {
        encrypt: true, // Esto es para que encripte la conexión
        trustServerCertificate: true // Y esto es para que pueda creer en los certificados en conexión
    }
};

// Esta es una promesa, debido a que la conexión lleva su tiempo le ponemos que es asíncrona para que espere el retorno
async function getConnection() {
    try {
        return await mssql.connect(connectionSettings);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { getConnection, mssql };
