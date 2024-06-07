import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Typography, IconButton } from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';
import EquipoForm from './EquipoForm';
import Modal from './Modal';

const ListaEquipos = () => {
    const [equipos, setEquipos] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [equipoActual, setEquipoActual] = useState(null);

    const obtenerEquipos = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/equipo');
            setEquipos(response.data);
        } catch (error) {
            console.error('Error al obtener los equipos:', error);
        }
    };

    useEffect(() => {
        obtenerEquipos();
    }, []);

    const handleEdit = (equipo) => {
        setEquipoActual(equipo);
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo!'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:3000/api/equipo/${id}`);
                obtenerEquipos();
                Swal.fire('¡Eliminado!', 'El equipo ha sido eliminado.', 'success');
            } catch (error) {
                console.error('Error al eliminar el equipo:', error);
            }
        }
    };

    return (
        <Card className="h-auto w-auto overflow-auto">
            <div className="overflow-auto" style={{ maxHeight: '500px' }}>
                <table className="w-full table-auto text-left">
                    <thead>
                        <tr>
                            <th className="border-b border-blue-gray-00 bg-blue-800 p-4">
                                <Typography variant="small" color="white" className="leading-none text-white font-semibold">ID</Typography>
                            </th>
                            <th className="border-b border-blue-gray-00 bg-blue-800 p-4">
                                <Typography variant="small" color="white" className="leading-none text-white font-semibold">Nombre</Typography>
                            </th>
                            <th className="border-b border-blue-gray-00 bg-blue-800 p-4">
                                <Typography variant="small" color="white" className="leading-none text-white font-semibold">Descripción</Typography>
                            </th>
                            <th className="border-b border-blue-gray-00 bg-blue-800 p-4">
                                <Typography variant="small" color="white" className="leading-none text-white font-semibold">Empleados</Typography>
                            </th>
                            <th className="border-b border-blue-gray-00 bg-blue-800 p-4">
                                <Typography variant="small" color="white" className="leading-none text-white font-semibold">Departamento</Typography>
                            </th>
                            <th className="border-b border-blue-gray-00 bg-blue-800 p-4">
                                <Typography variant="small" color="white" className="leading-none text-white font-semibold">Acciones</Typography>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipos.map((equipo) => (
                            <tr key={equipo.ID}>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Typography variant="small" color="blue-gray" className="font-normal">{equipo.ID}</Typography>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Typography variant="small" color="blue-gray" className="font-normal">{equipo.Nombre}</Typography>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Typography variant="small" color="blue-gray" className="font-normal">{equipo.Descripcion}</Typography>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Typography variant="small" color="blue-gray" className="font-normal">{equipo.Empleados}</Typography>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Typography variant="small" color="blue-gray" className="font-normal">{equipo.Departamento}</Typography>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <div className="flex items-center space-x-4">
                                        <IconButton variant="text" color="blue" onClick={() => handleEdit(equipo)}>
                                            <PencilIcon className="h-5 w-5" />
                                        </IconButton>
                                        <IconButton variant="text" color="red" onClick={() => handleDelete(equipo.ID)}>
                                            <TrashIcon className="h-5 w-5" />
                                        </IconButton>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <EquipoForm
                    onClose={() => setModalOpen(false)}
                    equipoActual={equipoActual}
                    obtenerEquipos={obtenerEquipos}
                />
            </Modal>
        </Card>
    );
};

export default ListaEquipos;
