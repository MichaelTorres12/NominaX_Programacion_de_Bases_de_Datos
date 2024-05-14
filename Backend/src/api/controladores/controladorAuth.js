<<<<<<< HEAD
//Importamos el modelo de Usuarios
const Usuario = require('../../modelos/Usuario.js');
=======
const Usuario = require('../../modelos/Usuario');
>>>>>>> 89ccf9956dbf5cb309b99eb93559b703104657a5

exports.login = async (req, res) => {
    const { nombreUsuario, contrasena } = req.body;
    try {
        const usuario = await Usuario.encontrarUsuarioPorCredenciales(nombreUsuario, contrasena);
        if (!usuario) {
            return res.status(401).json({ mensaje: 'Credenciales no válidas' });
        }

        if (usuario.ID_Rol === 1) {
            res.json({ mensaje: "Bienvenido Administrador", vista: "admin" });
        } else {
            res.json({ mensaje: "Bienvenido Empleado", vista: "empleado" });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
};
