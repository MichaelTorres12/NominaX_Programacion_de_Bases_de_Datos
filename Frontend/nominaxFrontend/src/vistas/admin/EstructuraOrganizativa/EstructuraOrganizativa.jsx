import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@material-tailwind/react";
import Swal from 'sweetalert2';
import DepartamentoForm from '../../../componentes/comunes/DepartamentoForm';
import ListaDepartamentos from '../../../componentes/comunes/ListaDepartamentos';
import Modal from '../../../componentes/comunes/Modal';

const EstructuraOrganizativa = () => {
    const [departamentos, setDepartamentos] = useState([]);
    const [departamentoActual, setDepartamentoActual] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        obtenerDepartamentos();
    }, []);

    const obtenerDepartamentos = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/departamento');
            setDepartamentos(response.data);
        } catch (error) {
            console.error('Error al obtener los departamentos:', error);
        }
    };

    const handleAgregarDepartamento = () => {
        setDepartamentoActual(null);
        setModalOpen(true);
    };

    const handleEditarDepartamento = (departamento) => {
        setDepartamentoActual(departamento);
        setModalOpen(true);
    };

    const handleEliminarDepartamento = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:3000/api/departamento/${id}`);
                    obtenerDepartamentos();
                    Swal.fire(
                        '¡Eliminado!',
                        'El departamento ha sido eliminado.',
                        'success'
                    );
                } catch (error) {
                    console.error('Error al eliminar el departamento:', error);
                    Swal.fire(
                        'Error',
                        'Hubo un error al eliminar el departamento. Por favor, intente nuevamente.',
                        'error'
                    );
                }
            }
        });
    };

    return (
        <div>
          <div className='p-20 h-screen bg-[#f0f0f0]'>
            <h1 className="text-3xl font-bold mb-10">Estructura Organizativa</h1>
            <div className="mb-5 flex justify-end">
                <Button color="black" onClick={handleAgregarDepartamento}>Agregar Departamento</Button>
            </div>
            <ListaDepartamentos
                departamentos={departamentos}
                onEditar={handleEditarDepartamento}
                onEliminar={handleEliminarDepartamento}
            />
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <DepartamentoForm
                    departamentoActual={departamentoActual}
                    setDepartamentoActual={setDepartamentoActual}
                    obtenerDepartamentos={obtenerDepartamentos}
                    setModalOpen={setModalOpen}
                />
            </Modal>
            </div>
        </div>
    );
};

export default EstructuraOrganizativa;
