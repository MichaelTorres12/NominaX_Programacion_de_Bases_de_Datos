import React from 'react';
import { Card, Typography, IconButton } from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

const ListaEquipos = ({ equipos, onEditar, onEliminar }) => {
    return (
        <Card className="h-auto w-auto overflow-auto">
            <div className="overflow-auto" style={{ maxHeight: '300px' }}>
                <table className="w-full table-auto text-left">
                    <thead className="sticky top-0 z-10">
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
                        {equipos.map((equipo, index) => {
                            const isLast = index === equipos.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={equipo.ID}>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {equipo.ID}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} bg-blue-gray-50/50`}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {equipo.Nombre}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {equipo.Descripción}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} bg-blue-gray-50/50`}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {equipo.Empleados}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {equipo.Departamento}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} bg-blue-gray-50/50`}>
                                        <div className="flex items-center space-x-4">
                                            <IconButton variant="text" color="blue" onClick={() => onEditar(equipo)}>
                                                <PencilIcon className="h-5 w-5" />
                                            </IconButton>
                                            <IconButton variant="text" color="red" onClick={() => onEliminar(equipo.ID)}>
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

ListaEquipos.propTypes = {
    equipos: PropTypes.array.isRequired,
    onEditar: PropTypes.func.isRequired,
    onEliminar: PropTypes.func.isRequired,
};

export default ListaEquipos;
