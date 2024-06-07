import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, IconButton } from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const TABLE_HEAD = [
    { label: "ID", width: "w-16" },
    { label: "Nombre", width: "w-48" },
    { label: "Descripción", width: "w-64" },
    { label: "Empleados", width: "w-24" },
    { label: "Ubicación", width: "w-48" },
    { label: "Equipos Asignados", width: "w-32" },
    { label: "Acciones", width: "w-32" }
];

const ListaDepartamentos = ({ departamentos, onEditar, onEliminar }) => {
    return (
        <Card className="h-auto w-auto overflow-auto">
            <div className="overflow-auto" style={{ maxHeight: '300px' }}>
                <table className="w-full table-auto text-left">
                    <thead className="sticky top-0 z-10">
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head.label} className={`border-b border-blue-gray-00 bg-blue-800 p-4 ${head.width}`}>
                                    <Typography
                                        variant="small"
                                        color="white"
                                        className="leading-none text-white font-semibold"
                                    >
                                        {head.label}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {departamentos.map((departamento, index) => {
                            const isLast = index === departamentos.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={departamento.ID}>
                                    <td className={`${classes} w-16`}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {departamento.ID}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} bg-blue-gray-50/50 w-48`}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {departamento.Nombre}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} w-64`}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {departamento.Descripcion}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} bg-blue-gray-50/50 w-24`}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {departamento.Empleados}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} w-48`}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {departamento.Ubicacion}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} bg-blue-gray-50/50 w-32`}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {departamento.EquiposAsignados}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} w-32`}>
                                        <div className="flex items-center space-x-4">
                                            <IconButton variant="text" color="blue" onClick={() => onEditar(departamento)}>
                                                <PencilIcon className="h-5 w-5" />
                                            </IconButton>
                                            <IconButton variant="text" color="red" onClick={() => onEliminar(departamento.ID)}>
                                                <TrashIcon className="h-5 w-5" />
                                            </IconButton>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

ListaDepartamentos.propTypes = {
    departamentos: PropTypes.array.isRequired,
    onEditar: PropTypes.func.isRequired,
    onEliminar: PropTypes.func.isRequired,
};

export default ListaDepartamentos;
