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
        nombres: '',
        apellido: '',
        tituloPuesto: '',
        direccion: '',
        numeroTel: '',
        email: '',
        fechaNacimiento: '',
        estadoCivil: '',
        numSeguridadSocial: '',
        idEquipo: '',
        idDepartamento: ''
    });

    const handleEdit = (empleado) => {
        setEmpleadoActual(empleado);
        setModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que los campos ID_Departamento y ID_Equipo no estén vacíos
        if (!empleadoActual.idDepartamento || !empleadoActual.idEquipo) {
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

            const empleadoData = qs.stringify(empleadoActual);

            if (empleadoActual.ID) {
                await axios.patch(`http://localhost:3000/api/empleados/${empleadoActual.ID}`, empleadoData, config);
            } else {
                await axios.post('http://localhost:3000/api/empleados', empleadoData, config);
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
          <div className='p-20 h-screen w-full'>
            <h1 className='text-3xl font-bold mb-10'>Gestión de Empleados</h1>
            <div className='w-full flex justify-end'>
              <Button className='mb-5' onClick={() => setModalOpen(true)}>Agregar Empleado</Button>
            </div>
            <Tabla onEdit={handleEdit} />
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Nombre" value={empleadoActual.nombres} onChange={(e) => setEmpleadoActual({ ...empleadoActual, nombres: e.target.value })} />
                    <Input label="Apellido" value={empleadoActual.apellido} onChange={(e) => setEmpleadoActual({ ...empleadoActual, apellido: e.target.value })} />
                    <Input label="Puesto" value={empleadoActual.tituloPuesto} onChange={(e) => setEmpleadoActual({ ...empleadoActual, tituloPuesto: e.target.value })} />
                    <Input label="Dirección" value={empleadoActual.direccion} onChange={(e) => setEmpleadoActual({ ...empleadoActual, direccion: e.target.value })} />
                    <Input label="Teléfono" value={empleadoActual.numeroTel} onChange={(e) => setEmpleadoActual({ ...empleadoActual, numeroTel: e.target.value })} />
                    <Input label="Email" value={empleadoActual.email} onChange={(e) => setEmpleadoActual({ ...empleadoActual, email: e.target.value })} />
                    <Input label="Fecha de Nacimiento" type="date" value={empleadoActual.fechaNacimiento} onChange={(e) => setEmpleadoActual({ ...empleadoActual, fechaNacimiento: e.target.value })} />
                    <Input label="Estado Civil" value={empleadoActual.estadoCivil} onChange={(e) => setEmpleadoActual({ ...empleadoActual, estadoCivil: e.target.value })} />
                    <Input label="Número de Seguridad Social" value={empleadoActual.numSeguridadSocial} onChange={(e) => setEmpleadoActual({ ...empleadoActual, numSeguridadSocial: e.target.value })} />
                    <Input label="Departamento" value={empleadoActual.idDepartamento} onChange={(e) => setEmpleadoActual({ ...empleadoActual, idDepartamento: e.target.value })} />
                    <Input label="Equipo" value={empleadoActual.idEquipo} onChange={(e) => setEmpleadoActual({ ...empleadoActual, idEquipo: e.target.value })} />
                    <Button type="submit">Guardar</Button>
                </form>
            </Modal>
          </div>
        </div>
    );
};

export default GestionEmpleados;
