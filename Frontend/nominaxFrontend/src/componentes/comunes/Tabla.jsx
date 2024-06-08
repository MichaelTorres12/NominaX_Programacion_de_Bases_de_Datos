import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Typography, IconButton } from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

const TABLE_HEAD = ["Id", "Nombres", "Apellidos", "Puesto", "Dirección", "Teléfono", "Email", "Edad", "Estado Civil", "ISSS", "Departamento", "Equipo", "Acciones"];

const Tabla = ({ onEdit }) => {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  const obtenerEmpleados = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/empleados');
      setEmpleados(response.data);
    } catch (error) {
      console.error('Error al obtener los empleados:', error);
    }
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
        await axios.delete(`http://localhost:3000/api/empleados/${id}`);
        obtenerEmpleados();
        Swal.fire(
          '¡Eliminado!',
          'El empleado ha sido eliminado.',
          'success'
        );
      } catch (error) {
        console.error('Error al eliminar el empleado:', error);
      }
    }
  };

  return (
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
            {empleados.map((empleado, index) => {
              const isLast = index === empleados.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={empleado.ID}>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {empleado.ID}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {empleado.Nombres}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {empleado.Apellidos}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {empleado.Puesto}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {empleado.Direccion}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {empleado.Teléfono}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {empleado.Email}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {empleado.Edad}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {empleado.Estado_Civil}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {empleado.ISSS}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {empleado.Departamento}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {empleado.Equipo}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center space-x-4">
                      <IconButton variant="text" color="blue" onClick={() => onEdit(empleado)}>
                        <PencilIcon className="h-5 w-5" />
                      </IconButton>
                      <IconButton variant="text" color="red" onClick={() => handleDelete(empleado.ID)}>
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
}

Tabla.propTypes = {
  onEdit: PropTypes.func.isRequired,
};

export default Tabla;

