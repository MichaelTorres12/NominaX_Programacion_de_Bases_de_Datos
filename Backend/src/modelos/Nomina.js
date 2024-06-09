const { getConnection, mssql } = require('../db/conexionDB.js');

const getNomina = async () => {
    const pool = await getConnection();
    const resultado = await pool.request()
        .query('SELECT * FROM VistaNominaCompleta');
    // console.log(resultado);
    return resultado.recordset;
};


const insertarNomina = async (id_empleado, periodo_pago, total_bruto, deducciones, fecha_pago, concepto, cantidad) => {
    const pool = await getConnection();
    const resultado = await pool.request()
        .input('ID_Empleado', id_empleado)
        .input('Periodo_Pago', periodo_pago)
        .input('Total_Bruto', total_bruto)
        .input('Deducciones', deducciones)
        .input('Fecha_Pago', fecha_pago)
        .input('Concepto_Pago', concepto)
        .input('Cantidad', cantidad)
        .execute(`dbo.InsertarNomina`);
    console.log(resultado);
    return resultado;
}


const eliminatNomina = async(id) => {
    const pool = await getConnection();
    const resultado = await pool.request()
        .input("ID_Nomina", id)
        .execute('dbo.BorrarNomina')
    return resultado;
}


const actualizarNomina = async (id_nomina, id_empleado, periodo_pago, total_bruto, deducciones, fecha_pago, concepto, cantidad) => {
    const pool = await getConnection();
    const resultado = await pool.request()
        .input('ID_Nomina', id_nomina)
        .input('ID_Empleado', id_empleado)
        .input('Periodo_Pago', periodo_pago)
        .input('Total_Bruto', total_bruto)
        .input('Deducciones', deducciones)
        .input('Fecha_Pago', fecha_pago)
        .input('Concepto_Pago', concepto)
        .input('Cantidad', cantidad)
        .execute(`dbo.ActualizarNomina`);
    console.log(resultado);
    return resultado;
}


const obtenerNominaPorID = async (id) => {
    const pool = await getConnection();
    const resultado = await pool.request()
        .input('ID_Nomina', id)
        .execute(`dbo.ObtenerNominaPorID`);
    console.log(resultado);
    return resultado;
}

module.exports = { getNomina, insertarNomina, eliminatNomina, actualizarNomina, obtenerNominaPorID };