import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input } from "@material-tailwind/react";
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const EquipoForm = ({ equipoActual, setEquipoActual, obtenerEquipos, setModalOpen }) => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [idDepartamento, setIdDepartamento] = useState('');

    useEffect(() => {
        if (equipoActual) {
            setNombre(equipoActual.Nombre);
            setDescripcion(equipoActual.Descripción);
            setIdDepartamento(equipoActual.ID_Departamento.toString());
        }
    }, [equipoActual]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (equipoActual) {
                // Actualizar equipo existente
                await axios.patch(`http://localhost:3000/api/equipo/${equipoActual.ID}`, {
                    nombres: nombre,
                    descripcion,
                    id_departamento: parseInt(idDepartamento, 10)
                });
                Swal.fire('Actualizado', 'Equipo actualizado correctamente', 'success');
            } else {
                // Crear nuevo equipo
                await axios.post('http://localhost:3000/api/equipo', {
                    nombres: nombre,
                    descripcion,
                    id_departamento: parseInt(idDepartamento, 10)
                });
                Swal.fire('Creado', 'Equipo creado correctamente', 'success');
            }

            obtenerEquipos();
            setModalOpen(false);
        } catch (error) {
            console.error('Error al guardar el equipo:', error);
            Swal.fire('Error', 'Hubo un error al guardar el equipo. Por favor, intente nuevamente.', 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <Input
                    type="text"
                    label="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <Input
                    type="text"
                    label="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <Input
                    type="text"
                    label="ID del Departamento"
                    value={idDepartamento}
                    onChange={(e) => setIdDepartamento(e.target.value)}
                    required
                />
            </div>
            <div className="flex justify-end">
                <Button type="submit" color="green">
                    Guardar
                </Button>
            </div>
        </form>
    );
};

EquipoForm.propTypes = {
    equipoActual: PropTypes.object,
    setEquipoActual: PropTypes.func.isRequired,
    obtenerEquipos: PropTypes.func.isRequired,
    setModalOpen: PropTypes.func.isRequired,
};

export default EquipoForm;
