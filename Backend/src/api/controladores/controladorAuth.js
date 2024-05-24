// Importamos el modelo de Usuarios
const Usuario = require('../../modelos/Usuario.js');

// Función para manejar el inicio de sesión
exports.login = async (req, res) => {
    // Extraemos nombre de usuario y contraseña del cuerpo de la solicitud
    const { nombreUsuario, contrasena } = req.body;
    try {
        // Buscamos al usuario por sus credenciales
        const usuario = await Usuario.encontrarUsuarioPorCredenciales(nombreUsuario, contrasena);
        
        // Si no se encuentra el usuario, enviamos una respuesta con estado 401 (No autorizado)
        if (!usuario) {
            return res.status(401).json({ mensaje: 'Credenciales no válidas' });
        }

        // Si el usuario es un administrador, enviamos un mensaje de bienvenida y la vista correspondiente
        if (usuario.ID_Rol === 1) {
            // Este mensaje y vista pueden ser utilizados por el frontend para mostrar la interfaz de administrador
            res.json({ mensaje: "Bienvenido Administrador", vista: "admin" });
        } else {
            // Si el usuario no es administrador, asumimos que es un empleado y enviamos el mensaje correspondiente
            // Este mensaje y vista pueden ser utilizados por el frontend para mostrar la interfaz de empleado
            res.json({ mensaje: "Bienvenido Empleado", vista: "empleado" });
        }
    } catch (error) {
        // En caso de error en el servidor, enviamos una respuesta con estado 500 (Error del servidor) y el mensaje de error
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
};
