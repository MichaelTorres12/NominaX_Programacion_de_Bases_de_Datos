const { getConnection, mssql } = require('../db/conexionDB.js');

const registroAsistencia = () => {
    const pool = getConnection();
    const result = pool.request()
        
}