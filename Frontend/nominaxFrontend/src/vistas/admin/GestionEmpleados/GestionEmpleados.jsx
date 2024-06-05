import { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import Tabla from '../../../componentes/comunes/Tabla';
import Modal from '../../../componentes/comunes/Modal';
import { Button, Input } from "@material-tailwind/react";
import Swal from 'sweetalert2';

const GestionEmpleados = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [empleadoActual, setEmpleadoActual] = useState({
        Nombre: '',
        Apellido: '',
        Puesto: '',
        Direccion: '',
        Telefono: '',
        Email: '',
        Fecha_Nacimiento: '',
        Estado_Civil: '',
        Num_Seguridad_Social: '',
        ID_Departamento: '',
        ID_Equipo: ''
    });

    const handleEdit = async (empleado) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/empleados/${empleado.ID}`);
            setEmpleadoActual(response.data);
            setModalOpen(true);
        } catch (error) {
            console.error('Error al obtener los detalles del empleado:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al obtener los detalles del empleado. Por favor, intente nuevamente.'
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que los campos ID_Departamento y ID_Equipo no estén vacíos
        if (!empleadoActual.ID_Departamento || !empleadoActual.ID_Equipo) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, asegúrese de que los campos de Departamento y Equipo no estén vacíos.'
            });
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            const payload = qs.stringify({
                nombres: empleadoActual.Nombre,
                apellido: empleadoActual.Apellido,
                tituloPuesto: empleadoActual.Puesto,
                direccion: empleadoActual.Direccion,
                numeroTel: empleadoActual.Telefono,
                email: empleadoActual.Email,
                fechaNacimiento: empleadoActual.Fecha_Nacimiento,
                estadoCivil: empleadoActual.Estado_Civil,
                numSeguridadSocial: empleadoActual.Num_Seguridad_Social,
                idEquipo: empleadoActual.ID_Equipo,
                idDepartamento: empleadoActual.ID_Departamento
            });

            if (empleadoActual.ID) {
                await axios.patch(`http://localhost:3000/api/empleados/${empleadoActual.ID}`, payload, config);
            } else {
                await axios.post('http://localhost:3000/api/empleados', payload, config);
            }

            setModalOpen(false);
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Empleado guardado correctamente.'
            });
        } catch (error) {
            console.error('Error al guardar el empleado:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al guardar el empleado. Por favor, intente nuevamente.'
            });
        }
    };

    return (
        <div>
            <div className='p-20 h-screen bg-[#f0f0f0]'>
                <h1 className='text-3xl font-bold mb-10'>Gestión de Empleados</h1>
                <div className='w-full flex justify-end'>
                    <Button className='mb-5' onClick={() => setModalOpen(true)}>Agregar Empleado</Button>
                </div>
                <Tabla onEdit={handleEdit} />
                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input label="Nombre" value={empleadoActual.Nombre} onChange={(e) => setEmpleadoActual({ ...empleadoActual, Nombre: e.target.value })} />
                        <Input label="Apellido" value={empleadoActual.Apellido} onChange={(e) => setEmpleadoActual({ ...empleadoActual, Apellido: e.target.value })} />
                        <Input label="Puesto" value={empleadoActual.Puesto} onChange={(e) => setEmpleadoActual({ ...empleadoActual, Puesto: e.target.value })} />
                        <Input label="Dirección" value={empleadoActual.Direccion} onChange={(e) => setEmpleadoActual({ ...empleadoActual, Direccion: e.target.value })} />
                        <Input label="Teléfono" value={empleadoActual.Telefono} onChange={(e) => setEmpleadoActual({ ...empleadoActual, Telefono: e.target.value })} />
                        <Input label="Email" value={empleadoActual.Email} onChange={(e) => setEmpleadoActual({ ...empleadoActual, Email: e.target.value })} />
                        <Input label="Fecha de Nacimiento" type="date" value={empleadoActual.Fecha_Nacimiento} onChange={(e) => setEmpleadoActual({ ...empleadoActual, Fecha_Nacimiento: e.target.value })} />
                        <Input label="Estado Civil" value={empleadoActual.Estado_Civil} onChange={(e) => setEmpleadoActual({ ...empleadoActual, Estado_Civil: e.target.value })} />
                        <Input label="Número de Seguridad Social" value={empleadoActual.Num_Seguridad_Social} onChange={(e) => setEmpleadoActual({ ...empleadoActual, Num_Seguridad_Social: e.target.value })} />
                        <Input label="Departamento" value={empleadoActual.ID_Departamento} onChange={(e) => setEmpleadoActual({ ...empleadoActual, ID_Departamento: e.target.value })} />
                        <Input label="Equipo" value={empleadoActual.ID_Equipo} onChange={(e) => setEmpleadoActual({ ...empleadoActual, ID_Equipo: e.target.value })} />
                        <Button type="submit">Guardar</Button>
                    </form>
                </Modal>
            </div>
        </div>
    );
};

export default GestionEmpleados;
