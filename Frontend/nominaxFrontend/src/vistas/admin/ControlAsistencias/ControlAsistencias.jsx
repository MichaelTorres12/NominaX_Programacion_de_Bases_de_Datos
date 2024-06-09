import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["ID", "Fecha", "Empleado", "Hora Entrada", "Hora Salida", "Justificación", "Estado"];

const ControlAsistencias = () => {
    const [asistencias, setAsistencias] = useState([]);

    useEffect(() => {
        obtenerAsistencias();
    }, []);

    const obtenerAsistencias = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/asistencia');
            setAsistencias(response.data);
        } catch (error) {
            console.error('Error al obtener las asistencias:', error);
        }
    };

    return (
        <div className='p-20 h-screen bg-[#f0f0f0]'>
            <h1 className="text-3xl font-bold mb-10">Control de Asistencias</h1>
            <Card className="h-auto w-auto overflow-auto">
                <div className="overflow-auto" style={{ maxHeight: '600px' }}>
                    <table className="w-full  table-auto text-left">
                        <thead className="sticky top-0 z-10">
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="border-b border-blue-gray-00 bg-blue-800 p-4">
                                        <Typography
                                            variant="small"
                                            color="white"
                                            className="leading-none text-white font-semibold"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {asistencias.map((asistencia, index) => {
                                const isLast = index === asistencias.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={asistencia.ID}>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asistencia.ID}
                                            </Typography>
                                        </td>
                                        <td className={`${classes} bg-blue-gray-50/50`}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asistencia.Empleado}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asistencia.Fecha}
                                            </Typography>
                                        </td>
                                        <td className={`${classes} bg-blue-gray-50/50`}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asistencia["Hora Entrada"]}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asistencia["Hora Salida"]}
                                            </Typography>
                                        </td>
                                        <td className={`${classes} bg-blue-gray-50/50`}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asistencia.Justificacion}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {asistencia.Estado}
                                            </Typography>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default ControlAsistencias;
