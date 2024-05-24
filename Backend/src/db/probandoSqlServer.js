// ESTE ARCHIVO ES SOLO PARA PROBAR QUE LA CONEXIÓN ESTÉ BIEN HECHA Y FUNCIONE
/*
Para poder probar este archivo, uno tiene que irse a package.json.
abajo de donde dice: "main": "app.js",
pegar lo siguiente: "type": "module",

una vez se ha probado, quitarlo y dejarse tal y como se encontró, es por problemas de lectura entre ES y CommonJS
*/

<<<<<<< HEAD
import { getConnection } from "./conexionDB.js";
=======
const { getConnection, mssql } = require("./conexionDB");
>>>>>>> 95e0dc8aca001e7e97510424ff131da2e524a729

// Aquí usamos un pool de conexiones
const getEmpleados = async () => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT ID_Empleado, Nombre, Apellido, Direccion, Email, Fecha_Nacimiento, Fecha_Ingreso, Estado_Civil, Num_Seguridad_Social FROM Empleado");
        console.table(result.recordset); // Para que muestre los resultados en tabla
        console.log("¡Los empleados están enlistados!\n");
    } catch (error) {
        console.error(error);
    }
}

getEmpleados();
