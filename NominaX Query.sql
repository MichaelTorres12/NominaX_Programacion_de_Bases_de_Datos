USE master;
GO

-- Creación de la base de datos NominaX
CREATE DATABASE NominaXDataBase;
GO

USE NominaXDataBase;
GO

-- Creación de la tabla Empleado
CREATE TABLE Empleado (
    ID_Empleado INT PRIMARY KEY IDENTITY,
    Nombre NVARCHAR(100),
    Apellido NVARCHAR(100),
    Direccion NVARCHAR(255),
    Email NVARCHAR(100),
    Fecha_Nacimiento DATE,
    Fecha_Ingreso DATE,
    Estado_Civil NVARCHAR(50),
    Num_Seguridad_Social NVARCHAR(50)
);
GO

-- Creación de la tabla Departamento
CREATE TABLE Departamento (
    ID_Departamento INT PRIMARY KEY IDENTITY,
    Nombre NVARCHAR(100),
    Descripcion NVARCHAR(255),
    Ubicacion NVARCHAR(100)
);
GO

-- Creación de la tabla Equipo
CREATE TABLE Equipo (
    ID_Equipo INT PRIMARY KEY IDENTITY,
    Nombre NVARCHAR(100),
    Descripcion NVARCHAR(255),
    ID_Departamento INT FOREIGN KEY REFERENCES Departamento(ID_Departamento)
);
GO

-- Creación de la tabla EmpleadoEquipo
CREATE TABLE EmpleadoEquipo (
    ID_Empleado INT,
    ID_Equipo INT,
    Rol NVARCHAR(100),
    CONSTRAINT PK_EmpleadoEquipo PRIMARY KEY (ID_Empleado, ID_Equipo),
    CONSTRAINT FK_EmpleadoEquipo_Empleado FOREIGN KEY (ID_Empleado) REFERENCES Empleado(ID_Empleado),
    CONSTRAINT FK_EmpleadoEquipo_Equipo FOREIGN KEY (ID_Equipo) REFERENCES Equipo(ID_Equipo)
);
GO

-- Creación de la tabla PerfilProfesional
CREATE TABLE PerfilProfesional (
    ID_Perfil INT PRIMARY KEY IDENTITY,
    ID_Empleado INT FOREIGN KEY REFERENCES Empleado(ID_Empleado),
    Titulo_Puesto NVARCHAR(100),
    Descripcion_Puesto NVARCHAR(255),
    Fecha_Inicio DATE,
    Fecha_Fin DATE
);
GO

-- Creación de la tabla TelefonoEmpleado
CREATE TABLE TelefonoEmpleado (
    ID_TelefonoEmpleado INT PRIMARY KEY IDENTITY,
    ID_Empleado INT FOREIGN KEY REFERENCES Empleado(ID_Empleado),
    Numero_Telefono NVARCHAR(50)
);
GO

-- Creación de la tabla Nómina
CREATE TABLE Nomina (
    ID_Nomina INT PRIMARY KEY IDENTITY,
    ID_Empleado INT FOREIGN KEY REFERENCES Empleado(ID_Empleado),
    Periodo_Pago NVARCHAR(50),
    Total_Bruto DECIMAL(10, 2),
    Deducciones DECIMAL(10, 2),
    Fecha_Pago DATE
);
GO

-- Creación de la tabla DetalleNomina
CREATE TABLE DetalleNomina (
    ID_DetalleNomina INT PRIMARY KEY IDENTITY,
    ID_Nomina INT FOREIGN KEY REFERENCES Nomina(ID_Nomina),
    Concepto_Pago NVARCHAR(100),
    Cantidad DECIMAL(10, 2)
);
GO

-- Creación de la tabla RegistroAsistencia
CREATE TABLE RegistroAsistencia (
    ID_Asistencia INT PRIMARY KEY IDENTITY,
    ID_Empleado INT FOREIGN KEY REFERENCES Empleado(ID_Empleado),
    Fecha DATE,
    Hora_Entrada TIME,
    Hora_Salida TIME,
    Tipo_Jornada NVARCHAR(50)
);
GO

-- Creación de la tabla IncidenciaAsistencia
CREATE TABLE IncidenciaAsistencia (
    ID_Incidencia INT PRIMARY KEY IDENTITY,
    ID_Asistencia INT FOREIGN KEY REFERENCES RegistroAsistencia(ID_Asistencia),
    Tipo_Incidencia NVARCHAR(100),
    Descripcion NVARCHAR(255),
    Estado NVARCHAR(50)
);
GO

-- Creación de la tabla Justificacion
CREATE TABLE Justificacion (
    ID_Justificacion INT PRIMARY KEY IDENTITY,
    ID_Incidencia INT FOREIGN KEY REFERENCES IncidenciaAsistencia(ID_Incidencia),
    Descripcion NVARCHAR(255),
    Documento_Adjunto VARBINARY(MAX),
    Estado_Aprobacion NVARCHAR(50)
);
GO

-- Creación de la tabla Beneficio
CREATE TABLE Beneficio (
    ID_Beneficio INT PRIMARY KEY IDENTITY,
    Nombre NVARCHAR(100),
    Descripcion NVARCHAR(255),
    Tipo_Beneficio NVARCHAR(100)
);
GO

-- Creación de la tabla AsignacionBeneficio
CREATE TABLE AsignacionBeneficio (
    ID_Asignacion INT PRIMARY KEY IDENTITY,
    ID_Empleado INT FOREIGN KEY REFERENCES Empleado(ID_Empleado),
    ID_Beneficio INT FOREIGN KEY REFERENCES Beneficio(ID_Beneficio),
    Estado NVARCHAR(50),
    Fecha_Inicio DATE,
    Fecha_Fin DATE
);
GO

-- Creación de la tabla Rol
CREATE TABLE Rol (
    ID_Rol INT PRIMARY KEY IDENTITY,
    Nombre NVARCHAR(100),
    Descripcion NVARCHAR(255)
);
GO

-- Creación de la tabla Usuario
CREATE TABLE Usuario (
    ID_Usuario INT PRIMARY KEY IDENTITY,
    NombreUsuario NVARCHAR(100),
    Contrasena NVARCHAR(100),
    ID_Empleado INT FOREIGN KEY REFERENCES Empleado(ID_Empleado),
    ID_Rol INT FOREIGN KEY REFERENCES Rol(ID_Rol)
);
GO

------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
--POBLANDO LA BASE DE DATOS CON DATOS VERDADEROS

-- Insertando datos en la tabla Departamento
INSERT INTO Departamento (Nombre, Descripcion, Ubicacion) VALUES
('Recursos Humanos', 'Maneja las necesidades y políticas de personal.', 'Edificio Principal'),
('Tecnología de la Información', 'Soporte y desarrollo de sistemas informáticos.', 'Edificio de TI'),
('Finanzas', 'Gestión de las finanzas corporativas.', 'Edificio Administrativo'),
('Marketing', 'Promoción y estrategia de mercado.', 'Edificio Creativo'),
('Ventas', 'Gestión de ventas y relaciones con clientes.', 'Edificio Comercial');
GO

-- Insertando datos en la tabla Equipo
INSERT INTO Equipo (Nombre, Descripcion, ID_Departamento) VALUES
('Equipo de Reclutamiento', 'Encargado de atraer y seleccionar nuevos talentos.', 1),
('Soporte Técnico', 'Proporciona soporte técnico a la empresa.', 2),
('Contabilidad', 'Encargados de la contabilidad y finanzas.', 3),
('Social Media', 'Maneja las redes sociales y la presencia en línea.', 4),
('Ventas Internacionales', 'Gestiona las ventas fuera del país.', 5);
GO

-- Insertando datos en la tabla Empleado
INSERT INTO Empleado (Nombre, Apellido, Direccion, Email, Fecha_Nacimiento, Fecha_Ingreso, Estado_Civil, Num_Seguridad_Social) VALUES
('Juan', 'Pérez', 'Calle Falsa 123', 'juan.perez@example.com', '1985-06-15', '2010-04-01', 'Casado', '123-45-6789'),
('María', 'López', 'Avenida Siempre Viva 321', 'maria.lopez@example.com', '1990-09-25', '2015-08-23', 'Soltera', '987-65-4321'),
('Carlos', 'Gómez', 'Diagonal 456', 'carlos.gomez@example.com', '1975-12-03', '2005-05-17', 'Casado', '456-78-9123'),
('Ana', 'Martín', 'Paseo de la Reforma 789', 'ana.martin@example.com', '1988-03-22', '2013-03-15', 'Casada', '321-54-6789'),
('Pedro', 'Núñez', 'Ruta 27 654', 'pedro.nunez@example.com', '1980-11-11', '2000-01-01', 'Divorciado', '654-32-1987');
GO

-- Insertando datos en la tabla EmpleadoEquipo
INSERT INTO EmpleadoEquipo (ID_Empleado, ID_Equipo, Rol) VALUES
(1, 1, 'Gerente de Reclutamiento'),
(2, 2, 'Técnico Senior'),
(3, 3, 'Contador'),
(4, 4, 'Especialista en Redes Sociales'),
(5, 5, 'Director de Ventas Internacionales');
GO

-- Insertando datos en la tabla PerfilProfesional
INSERT INTO PerfilProfesional (ID_Empleado, Titulo_Puesto, Descripcion_Puesto, Fecha_Inicio, Fecha_Fin) VALUES
(1, 'Gerente de RH', 'Gestión del departamento de recursos humanos.', '2010-04-01', NULL),
(2, 'Ingeniero de Sistemas', 'Desarrollo y mantenimiento de software.', '2015-08-23', NULL),
(3, 'Contador Principal', 'Supervisión de las operaciones financieras.', '2005-05-17', NULL),
(4, 'Community Manager', 'Gestión de las redes sociales y comunicaciones online.', '2013-03-15', NULL),
(5, 'Director de Ventas', 'Liderazgo del equipo de ventas internacionales.', '2000-01-01', NULL);
GO

-- Insertando datos en la tabla TelefonoEmpleado
INSERT INTO TelefonoEmpleado (ID_Empleado, Numero_Telefono) VALUES
(1, '555-1234'),
(1, '555-5678'),
(2, '555-8765'),
(3, '555-4321'),
(4, '555-6789');
GO

-- Insertando datos en la tabla Beneficio
INSERT INTO Beneficio (Nombre, Descripcion, Tipo_Beneficio) VALUES
('Seguro de Salud', 'Cobertura médica completa.', 'Salud'),
('Fondo de Pensiones', 'Plan de pensiones para el retiro.', 'Retiro'),
('Bonos de Productividad', 'Bonos anuales basados en el rendimiento.', 'Monetario'),
('Gimnasio', 'Acceso a gimnasio corporativo.', 'Wellness'),
('Capacitación', 'Cursos y capacitaciones pagados por la empresa.', 'Educación');
GO

-- Insertando datos en la tabla AsignacionBeneficio
INSERT INTO AsignacionBeneficio (ID_Empleado, ID_Beneficio, Estado, Fecha_Inicio, Fecha_Fin) VALUES
(1, 1, 'Activo', '2020-01-01', NULL),
(2, 2, 'Activo', '2020-01-01', NULL),
(3, 3, 'Activo', '2020-01-01', NULL),
(4, 4, 'Activo', '2020-01-01', NULL),
(5, 5, 'Activo', '2020-01-01', NULL);
GO

-- Insertando datos en la tabla Nómina
INSERT INTO Nomina (ID_Empleado, Periodo_Pago, Total_Bruto, Deducciones, Fecha_Pago) VALUES
(1, '2023-01', 3000.00, 450.00, '2023-01-31'),
(2, '2023-01', 4000.00, 600.00, '2023-01-31'),
(3, '2023-01', 4500.00, 675.00, '2023-01-31'),
(4, '2023-01', 3200.00, 480.00, '2023-01-31'),
(5, '2023-01', 5000.00, 750.00, '2023-01-31');
GO

-- Insertando datos en la tabla DetalleNomina
INSERT INTO DetalleNomina (ID_Nomina, Concepto_Pago, Cantidad) VALUES
(1, 'Salario Base', 3000.00),
(2, 'Salario Base', 4000.00),
(3, 'Salario Base', 4500.00),
(4, 'Salario Base', 3200.00),
(5, 'Salario Base', 5000.00);
GO

-- Insertando datos en la tabla RegistroAsistencia
INSERT INTO RegistroAsistencia (ID_Empleado, Fecha, Hora_Entrada, Hora_Salida, Tipo_Jornada) VALUES
(1, '2023-01-01', '08:00:00', '17:00:00', 'Diurna'),
(2, '2023-01-01', '09:00:00', '18:00:00', 'Diurna'),
(3, '2023-01-01', '08:30:00', '17:30:00', 'Diurna'),
(4, '2023-01-01', '10:00:00', '19:00:00', 'Diurna'),
(5, '2023-01-01', '08:00:00', '17:00:00', 'Diurna');
GO

-- Insertando datos en la tabla IncidenciaAsistencia
INSERT INTO IncidenciaAsistencia (ID_Asistencia, Tipo_Incidencia, Descripcion, Estado) VALUES
(1, 'Tardanza', 'Llegada tarde por tráfico', 'Aprobado'),
(2, 'Ausencia', 'Ausencia justificada por médico', 'Pendiente'),
(3, 'Ausencia', 'Ausencia sin justificar', 'Denegado'),
(4, 'Tardanza', 'Retraso por falla de transporte', 'Aprobado'),
(5, 'Ausencia', 'Día personal', 'Aprobado');
GO

-- Insertando datos en la tabla Justificacion
INSERT INTO Justificacion (ID_Incidencia, Descripcion, Documento_Adjunto, Estado_Aprobacion) VALUES
(1, 'Justificación por tráfico con reporte de tráfico adjunto', NULL, 'Aprobado'),
(2, 'Justificación médica con certificado adjunto', NULL, 'En revisión'),
(3, 'Sin documento justificativo', NULL, 'Denegado'),
(4, 'Documento de falla de transporte público adjunto', NULL, 'Aprobado'),
(5, 'Solicitud previa de día personal', NULL, 'Aprobado');
GO

-- Insertando roles en la tabla Rol
INSERT INTO Rol (Nombre, Descripcion) VALUES
('Administrador', 'Acceso completo a todas las funciones de administración y configuración.'),
('Empleado', 'Acceso limitado a funciones específicas de empleados como marcar asistencia y presentar justificaciones.');
GO

-- Insertando usuarios y sus roles respectivos de admin o empleado
INSERT INTO Usuario (NombreUsuario, Contrasena, ID_Empleado, ID_Rol) VALUES
('adminRH', 'password123', 1, 1),  -- Usuario administrador para el empleado con ID 1
('empleado1', 'password123', 2, 2),  -- Usuario empleado para el empleado con ID 2
('empleado2', 'password123', 3, 2),  -- Usuario empleado para el empleado con ID 3
('adminFinanzas', 'password123', 4, 1),  -- Otro usuario administrador para el empleado con ID 4
('empleado3', 'password123', 5, 2);  -- Usuario empleado para el empleado con ID 5
GO


------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------

-- Seleccionar todos los datos de la tabla Empleado
SELECT * FROM Empleado;
GO
-- Seleccionar todos los datos de la tabla Departamento
SELECT * FROM Departamento;
GO
-- Seleccionar todos los datos de la tabla Equipo
SELECT * FROM Equipo;
GO
-- Seleccionar todos los datos de la tabla EmpleadoEquipo
SELECT * FROM EmpleadoEquipo;
GO
-- Seleccionar todos los datos de la tabla PerfilProfesional
SELECT * FROM PerfilProfesional;
GO
-- Seleccionar todos los datos de la tabla TelefonoEmpleado
SELECT * FROM TelefonoEmpleado;
GO
-- Seleccionar todos los datos de la tabla Nomina
SELECT * FROM Nomina;
GO
-- Seleccionar todos los datos de la tabla DetalleNomina
SELECT * FROM DetalleNomina;
GO
-- Seleccionar todos los datos de la tabla RegistroAsistencia
SELECT * FROM RegistroAsistencia;
GO
-- Seleccionar todos los datos de la tabla IncidenciaAsistencia
SELECT * FROM IncidenciaAsistencia;
GO
-- Seleccionar todos los datos de la tabla Justificacion
SELECT * FROM Justificacion;
GO
-- Seleccionar todos los datos de la tabla Beneficio
SELECT * FROM Beneficio;
GO
-- Seleccinar todos los datos de la tabla AsignacionBeneficio
SELECT * FROM AsignacionBeneficio;
GO
-- Seleccionar todos los roles en la tabla Rol
SELECT * FROM Rol;
GO
-- Seleccionar todos los usuarios en la tabla Usuario
SELECT * FROM Usuario;
GO

------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
-- FUNCIONES AVANZADAS --

-- CONSULTAS MULTIPLES:
--Consulta para obtener el total pagado en nóminas por departamento en un periodo específico.
SELECT d.Nombre, SUM(n.Total_Bruto) AS TotalPagado
FROM Departamento d
JOIN Equipo e ON d.ID_Departamento = e.ID_Departamento
JOIN EmpleadoEquipo ee ON e.ID_Equipo = ee.ID_Equipo
JOIN Empleado emp ON ee.ID_Empleado = emp.ID_Empleado
JOIN Nomina n ON emp.ID_Empleado = n.ID_Empleado
WHERE n.Fecha_Pago BETWEEN '2023-01-01' AND '2023-01-31'
GROUP BY d.Nombre;

--Consulta para obtener información detallada de los empleados y sus roles en los equipos
SELECT emp.Nombre, emp.Apellido, emp.Email, e.Nombre AS NombreEquipo, ee.Rol
FROM Empleado emp
JOIN EmpleadoEquipo ee ON emp.ID_Empleado = ee.ID_Empleado
JOIN Equipo e ON ee.ID_Equipo = e.ID_Equipo;

-- Consulta para listar todos los beneficios asignados a los empleados con su estado
SELECT emp.Nombre, emp.Apellido, b.Nombre AS Beneficio, ab.Estado, ab.Fecha_Inicio, ab.Fecha_Fin
FROM Empleado emp
JOIN AsignacionBeneficio ab ON emp.ID_Empleado = ab.ID_Empleado
JOIN Beneficio b ON ab.ID_Beneficio = b.ID_Beneficio;

-- PROCEDIMIENTOS ALMACENADOS.
-- Procedimiento para insertar un nuevo empleado y asignarlo a un equipo automáticamente.
CREATE PROCEDURE InsertarEmpleado
    @Nombre NVARCHAR(100),
    @Apellido NVARCHAR(100),
    @Direccion NVARCHAR(255),
    @Email NVARCHAR(100),
    @FechaNacimiento DATE,
    @FechaIngreso DATE,
    @EstadoCivil NVARCHAR(50),
    @NumSeguridadSocial NVARCHAR(50),
    @ID_Equipo INT,
    @Rol NVARCHAR(100)
AS
BEGIN
    INSERT INTO Empleado (Nombre, Apellido, Direccion, Email, Fecha_Nacimiento, Fecha_Ingreso, Estado_Civil, Num_Seguridad_Social)
    VALUES (@Nombre, @Apellido, @Direccion, @Email, @FechaNacimiento, @FechaIngreso, @EstadoCivil, @NumSeguridadSocial);
    
    DECLARE @ID_Empleado INT;
    SET @ID_Empleado = SCOPE_IDENTITY();
    
    INSERT INTO EmpleadoEquipo (ID_Empleado, ID_Equipo, Rol)
    VALUES (@ID_Empleado, @ID_Equipo, @Rol);
END;
GO

-- Procedimiento para actualizar el estado de una asignación de beneficio.
CREATE PROCEDURE ActualizarEstadoBeneficio
    @ID_Asignacion INT,
    @NuevoEstado NVARCHAR(50)
AS
BEGIN
    UPDATE AsignacionBeneficio
    SET Estado = @NuevoEstado
    WHERE ID_Asignacion = @ID_Asignacion;
END;
GO

-- Procedimiento para calcular las deducciones totales de un empleado en un periodo.
CREATE PROCEDURE CalcularDeducciones
    @ID_Empleado INT,
    @Periodo NVARCHAR(50),
    @FechaPago DATE
AS
BEGIN
    SELECT SUM(Deducciones) AS TotalDeducciones
    FROM Nomina
    WHERE ID_Empleado = @ID_Empleado AND Periodo_Pago = @Periodo AND Fecha_Pago = @FechaPago;
END;
GO

-- TRIGGERS.
-- Disparador para actualizar el estado de la justificación al cambiar el estado de la incidencia
CREATE TRIGGER ActualizarEstadoJustificacion
ON IncidenciaAsistencia
AFTER UPDATE
AS
BEGIN
    IF UPDATE(Estado)
    BEGIN
        UPDATE Justificacion
        SET Estado_Aprobacion = INSERTED.Estado
        FROM INSERTED
        WHERE Justificacion.ID_Incidencia = INSERTED.ID_Incidencia;
    END
END;
GO

-- Disparador para registrar automáticamente la fecha de fin de un perfil profesional al iniciar uno nuevo
CREATE TRIGGER RegistrarFinPerfilProfesional
ON PerfilProfesional
AFTER INSERT
AS
BEGIN
    UPDATE PerfilProfesional
    SET Fecha_Fin = GETDATE()
    WHERE ID_Empleado = INSERTED.ID_Empleado AND ID_Perfil != INSERTED.ID_Perfil;
END;
GO

-- Ejemplo de disparador para verificar la integridad de datos al agregar un empleado
CREATE TRIGGER trg_CheckEmployeeData
ON Empleado
AFTER INSERT
AS
BEGIN
    IF EXISTS (SELECT * FROM inserted WHERE Fecha_Nacimiento > Fecha_Ingreso)
    BEGIN
        RAISERROR ('Fecha de nacimiento no puede ser posterior a la fecha de ingreso', 16, 1);
        ROLLBACK TRANSACTION;
    END
END;
GO

-- VISTAS.
-- Vista para ver el resumen de empleados y sus departamentos
CREATE VIEW VistaResumenEmpleadosDepartamento AS
SELECT emp.Nombre, emp.Apellido, d.Nombre AS Departamento
FROM Empleado emp
JOIN EmpleadoEquipo ee ON emp.ID_Empleado = ee.ID_Empleado
JOIN Equipo e ON ee.ID_Equipo = e.ID_Equipo
JOIN Departamento d ON e.ID_Departamento = d.ID_Departamento;
GO

-- Vista para detalles de nómina y empleado.
CREATE VIEW VistaDetallesNominaEmpleado AS
SELECT emp.Nombre, emp.Apellido, n.Periodo_Pago, n.Total_Bruto, n.Deducciones, n.Fecha_Pago
FROM Nomina n
JOIN Empleado emp ON n.ID_Empleado = emp.ID_Empleado;
GO

-- Vista para acceso rápido a las justificaciones y sus estados
CREATE VIEW VistaJustificacionesEstado AS
SELECT j.Descripcion, j.Estado_Aprobacion, i.Descripcion AS Incidencia, i.Estado
FROM Justificacion j
JOIN IncidenciaAsistencia i ON j.ID_Incidencia = i.ID_Incidencia;
GO

