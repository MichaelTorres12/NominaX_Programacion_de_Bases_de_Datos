
const { getConnection, mssql } = require("./conexionDB");

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
