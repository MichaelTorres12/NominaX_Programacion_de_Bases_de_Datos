//Importamos el modelo de Usuarios
const nomina = require('../../modelos/Nomina.js');

exports.getNomina = async (req, res) => {
    try {
        const resultadoNomina = await nomina.getNomina();
        if (!resultadoNomina) {
            return res.status(401).json({ mensaje: 'No hay nominas en la base de datos' });
        }else {
            return res.status(200).json(resultadoNomina);
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
};


exports.insertNomina = async (req, res) => {
    const { id_empleado, periodo_pago, total_bruto, deducciones, fecha_pago, concepto, cantidad } = req.body;
    try {
        const resultadoNomina = await nomina.insertarNomina(id_empleado, periodo_pago, total_bruto, deducciones, fecha_pago, concepto, cantidad);
        if (!resultadoNomina) {
            return res.status(401).json({ mensaje: 'Hubo algun error' });
        }else {
            return res.status(200).json(resultadoNomina.recordset);
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
}

exports.eliminarNomina = async (req, res) => {
    const {id} = req.params;
    try {
        const resultadoNomina = await nomina.eliminatNomina(id);
        if (!resultadoNomina) {
            return res.status(401).json({ mensaje: 'Hubo algun error' });
        }else {
            return res.status(200).json(resultadoNomina);
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
}


exports.actualilzarNomina = async (req, res) => {
    const {id_nomina} = req.params;
    const { id_empleado, periodo_pago, total_bruto, deducciones, fecha_pago, concepto, cantidad } = req.body;
    try {
        const resultadoNomina = await nomina.actualizarNomina(id_nomina, id_empleado, periodo_pago, total_bruto, deducciones, fecha_pago, concepto, cantidad);
        if (!resultadoNomina) {
            return res.status(401).json({ mensaje: 'Hubo algun error' });
        }else {
            return res.status(200).json(resultadoNomina.recordset);
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
}

exports.obtenerNomina = async (req, res) => {
    const {id} = req.params;
    try {
        const resultadoNomina = await nomina.obtenerNominaPorID(id)
        if (!resultadoNomina) {
            return res.status(401).json({ mensaje: 'Hubo algun error' });
        }else {
            return res.status(200).json(resultadoNomina);
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
}