const { getConnection, mssql } = require('../db/conexionDB.js');

const controlEmpleados = async () => {
    const pool = await getConnection();
    const resultado = await pool.request()
        .query('SELECT * FROM VistaEmpleadosDetalles');
    // console.log(resultado);
    return resultado.recordset;
};


const insertEmpleados = async (nombres, apellido, tituloPuesto, direccion, numeroTel,email,fechaNacimiento,estadoCivil,numSeguridadSocial,idEquipo,idDepartamento) => {
    const pool = await getConnection();
    const resultado = await pool.request()
        .input('Nombre', nombres)
        .input('Apellido', apellido)
        .input('Titulo_Puesto', tituloPuesto)
        .input('Direccion', direccion)
        .input('Numero_Telefono', numeroTel)
        .input('Email', email)
        .input('Fecha_Nacimiento', fechaNacimiento)
        .input('Estado_Civil', estadoCivil)
        .input('Num_Seguridad_Social', numSeguridadSocial)
        .input('ID_Equipo', idEquipo)
        .input('ID_Departamento', idDepartamento)
        .execute(`dbo.InsertarEmpleadoDetalles`);
    console.log(resultado);
    return resultado;
}


const eliminatEmpleado = async(id) => {
    const pool = await getConnection();
    const resultado = await pool.request()
        .input("ID_Empleado", id)
        .execute('dbo.EliminarEmpleadoDetalles')
}


const actualizarEmpleado = async (id, nombres, apellido, tituloPuesto, direccion, numeroTel,email,fechaNacimiento,estadoCivil,numSeguridadSocial,idEquipo,idDepartamento) => {
    const pool = await getConnection();
    const resultado = await pool.request()
        .input('ID_Empleado', id)
        .input('Nombre', nombres)
        .input('Apellido', apellido)
        .input('Puesto', tituloPuesto)
        .input('Direccion', direccion)
        .input('Telefono', numeroTel)
        .input('Email', email)
        .input('Fecha_Nacimiento', fechaNacimiento)
        .input('Estado_Civil', estadoCivil)
        .input('Num_Seguridad_Social', numSeguridadSocial)
        .input('ID_Departamento', idDepartamento)
        .input('ID_Equipo', idEquipo)
        .execute(`dbo.ActualizarEmpleadoDetalles`);
    console.log(resultado);
    return resultado;
}

module.exports = { controlEmpleados, insertEmpleados, eliminatEmpleado, actualizarEmpleado };