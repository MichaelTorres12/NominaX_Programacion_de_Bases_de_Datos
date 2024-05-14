//Para poder usar el mssql primero deberian de instalan la dependencia, en la TERMINAL.
/*
En la terminal entran a la carpeta de Backend: PS C:\Users\Michael Torres\Desktop\NominaX_BasesDeDatos\Backend>
y ponen: npm i mssql
y le dan enter
*/
<<<<<<< HEAD
//import mssql from "mssql";
=======
const mssql = require("mssql");
>>>>>>> 89ccf9956dbf5cb309b99eb93559b703104657a5

const mssql = require('mssql');

// Aquí cambian los datos por los de sus credenciales
const connectionSettings = {
    server: "localhost",
    database: "NominaXDataBase",
    user: "sa",
    password: "200802",
    options: {
        encrypt: true, // Esto es para que encripte la conexión
        trustServerCertificate: true // Y esto es para que pueda creer en los certificados en conexión
    }
};

<<<<<<< HEAD
// Esta es una promesa, debido a que la conexión lleva su tiempo le ponemos que es asíncrona para que espere el retorno
=======
//Esta es una promesa, debido a que la conexión lleva su tiempo le ponemos que es asincrona para que espere el retorno
>>>>>>> 89ccf9956dbf5cb309b99eb93559b703104657a5
async function getConnection() {
    try {
        return await mssql.connect(connectionSettings);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

<<<<<<< HEAD
module.exports = { getConnection, mssql };
=======
module.exports = { getConnection, mssql };
>>>>>>> 89ccf9956dbf5cb309b99eb93559b703104657a5
