//Para poder usar el mssql primero deberian de instalan la dependencia, en la TERMINAL.
/*
En la terminal entran a la carpeta de Backend: PS C:\Users\Michael Torres\Desktop\NominaX_BasesDeDatos\Backend>
y ponen: npm i mssql
y le dan enter
*/
const mssql = require("mssql");

//Aqui cambian los datos por los de sus credenciales
const connectionSettings = {
    server: "localhost",
    database: "NominaXDataBase",
    user: "sa",
    password: "200802",
    options:{ //Esto es para que encripte la conexión y pueda creer en los certificados en conexión.
        encrypt: true,
        trustServerCertificate: true,
    }
}

//Esta es una promesa, debido a que la conexión lleva su tiempo le ponemos que es asincrona para que espere el retorno
async function getConnection() {
    try {
        return await mssql.connect(connectionSettings);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { getConnection, mssql };