import { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import { Input, Button } from "@material-tailwind/react";
import PropTypes from 'prop-types';

const EquipoForm = ({ onClose, equipoActual, obtenerEquipos }) => {
    const [equipo, setEquipo] = useState({
        Nombre: '',
        Descripcion: '',
        Departamento: ''
    });

    useEffect(() => {
        if (equipoActual) {
            setEquipo(equipoActual);
        }
    }, [equipoActual]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            if (equipo.ID) {
                await axios.patch(`http://localhost:3000/api/equipo/${equipo.ID}`, qs.stringify(equipo), config);
            } else {
                await axios.post('http://localhost:3000/api/equipo', qs.stringify(equipo), config);
            }

            obtenerEquipos();
            onClose();
        } catch (error) {
            console.error('Error al guardar el equipo:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Nombre" value={equipo.Nombre} onChange={(e) => setEquipo({ ...equipo, Nombre: e.target.value })} />
            <Input label="Descripción" value={equipo.Descripcion} onChange={(e) => setEquipo({ ...equipo, Descripcion: e.target.value })} />
            <Input label="Departamento" value={equipo.Departamento} onChange={(e) => setEquipo({ ...equipo, Departamento: e.target.value })} />
            <Button type="submit">Guardar</Button>
        </form>
    );
};

EquipoForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    equipoActual: PropTypes.object,
    obtenerEquipos: PropTypes.func.isRequired,
};

export default EquipoForm;
