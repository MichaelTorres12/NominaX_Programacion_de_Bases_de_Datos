import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@material-tailwind/react";
import Swal from 'sweetalert2';
import DepartamentoForm from '../../../componentes/comunes/DepartamentoForm';
import ListaDepartamentos from '../../../componentes/comunes/ListaDepartamentos';
import EquipoForm from '../../../componentes/comunes/EquipoForm';
import ListaEquipos from '../../../componentes/comunes/ListaEquipos';
import Modal from '../../../componentes/comunes/Modal';

const EstructuraOrganizativa = () => {
    const [departamentos, setDepartamentos] = useState([]);
    const [equipos, setEquipos] = useState([]);
    const [departamentoActual, setDepartamentoActual] = useState(null);
    const [equipoActual, setEquipoActual] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');

    useEffect(() => {
        obtenerDepartamentos();
        obtenerEquipos();
    }, []);

    const obtenerDepartamentos = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/departamento');
            setDepartamentos(response.data);
        } catch (error) {
            console.error('Error al obtener los departamentos:', error);
        }
    };

    const obtenerEquipos = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/equipo');
            setEquipos(response.data);
        } catch (error) {
            console.error('Error al obtener los equipos:', error);
        }
    };

    const handleAgregarDepartamento = () => {
        setDepartamentoActual(null);
        setModalType('departamento');
        setModalOpen(true);
    };

    const handleAgregarEquipo = () => {
        setEquipoActual(null);
        setModalType('equipo');
        setModalOpen(true);
    };

    const handleEditarDepartamento = (departamento) => {
        setDepartamentoActual(departamento);
        setModalType('departamento');
        setModalOpen(true);
    };

    const handleEditarEquipo = (equipo) => {
        setEquipoActual(equipo);
        setModalType('equipo');
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
                    Swal.fire('¡Eliminado!', 'El departamento ha sido eliminado.', 'success');
                } catch (error) {
                    console.error('Error al eliminar el departamento:', error);
                    Swal.fire('Error', 'Hubo un error al eliminar el departamento. Por favor, intente nuevamente.', 'error');
                }
            }
        });
    };

    const handleEliminarEquipo = (id) => {
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
                    await axios.delete(`http://localhost:3000/api/equipo/${id}`);
                    obtenerEquipos();
                    Swal.fire('¡Eliminado!', 'El equipo ha sido eliminado.', 'success');
                } catch (error) {
                    console.error('Error al eliminar el equipo:', error);
                    Swal.fire('Error', 'Hubo un error al eliminar el equipo. Por favor, intente nuevamente.', 'error');
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
                <div className="mt-10 mb-5 flex justify-end">
                    <Button color="black" onClick={handleAgregarEquipo}>Agregar Equipo</Button>
                </div>
                <ListaEquipos
                    equipos={equipos}
                    onEditar={handleEditarEquipo}
                    onEliminar={handleEliminarEquipo}
                />
                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                    {modalType === 'departamento' && (
                        <DepartamentoForm
                            departamentoActual={departamentoActual}
                            setDepartamentoActual={setDepartamentoActual}
                            obtenerDepartamentos={obtenerDepartamentos}
                            setModalOpen={setModalOpen}
                        />
                    )}
                    {modalType === 'equipo' && (
                        <EquipoForm
                            equipoActual={equipoActual}
                            setEquipoActual={setEquipoActual}
                            obtenerEquipos={obtenerEquipos}
                            setModalOpen={setModalOpen}
                        />
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default EstructuraOrganizativa;
