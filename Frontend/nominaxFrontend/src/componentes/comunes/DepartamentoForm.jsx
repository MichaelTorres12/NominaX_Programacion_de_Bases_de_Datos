import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input } from "@material-tailwind/react";
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import qs from 'qs';

const DepartamentoForm = ({ departamentoActual, setDepartamentoActual, obtenerDepartamentos, setModalOpen }) => {
    const [nombre, setNombre] = useState(departamentoActual?.Nombre || '');
    const [descripcion, setDescripcion] = useState(departamentoActual?.Descripcion || '');
    const [ubicacion, setUbicacion] = useState(departamentoActual?.Ubicacion || '');

    useEffect(() => {
        if (departamentoActual) {
            setNombre(departamentoActual.Nombre);
            setDescripcion(departamentoActual.Descripcion);
            setUbicacion(departamentoActual.Ubicacion);
        }
    }, [departamentoActual]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const data = {
            nombres: nombre,
            descripcion: descripcion,
            ubicacion: ubicacion
        };

        try {
            if (departamentoActual?.ID) {
                await axios.patch(`http://localhost:3000/api/departamento/${departamentoActual.ID}`, qs.stringify(data), config);
            } else {
                await axios.post('http://localhost:3000/api/departamento', qs.stringify(data), config);
            }

            setDepartamentoActual(null);
            setModalOpen(false);
            obtenerDepartamentos();
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Departamento guardado correctamente.'
            });
        } catch (error) {
            console.error('Error al guardar el departamento:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al guardar el departamento. Por favor, intente nuevamente.'
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <Input label="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            <Input label="Ubicación" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />
            <div className="flex justify-end space-x-2">
                <Button type="button" color="red" onClick={() => setModalOpen(false)}>Cancelar</Button>
                <Button type="submit" color="green">Guardar</Button>
            </div>
        </form>
    );
};

DepartamentoForm.propTypes = {
    departamentoActual: PropTypes.object,
    setDepartamentoActual: PropTypes.func.isRequired,
    obtenerDepartamentos: PropTypes.func.isRequired,
    setModalOpen: PropTypes.func.isRequired
};

export default DepartamentoForm;
