import { useState } from 'react';
import axios from 'axios';
import { Card, Button, Input } from "@material-tailwind/react";
import Swal from 'sweetalert2';

const DashboardEmpleado = () => {
  const [attendance, setAttendance] = useState({
    id_empleado: 1,  // Aquí deberías obtener dinámicamente el ID del empleado
    fecha: '',
    hora_entrada: '',
    hora_salida: '',
    tipo_asistencia: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAttendance({ ...attendance, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const asistenciaPayload = {
      id_empleado: attendance.id_empleado,
      fecha: attendance.fecha,
      hora_entrada: attendance.hora_entrada,
      hora_salida: attendance.hora_salida,
      tipo_asistencia: attendance.tipo_asistencia,
      tipo_incidencia: null,
      descripcion_incidencia: null,
      estado_incidencia: null,
      descripcion_justificacion: null,
      documento: null,
      estado_aprobacion: null
    };

    try {
      const response = await axios.post('http://localhost:3000/api/asistencia', asistenciaPayload);
      Swal.fire('Éxito', 'Asistencia marcada correctamente', 'success');
      console.log(response.data);
    } catch (error) {
      console.error('Error al marcar la asistencia:', error);
      Swal.fire('Error', 'Hubo un error al marcar la asistencia. Por favor, intente nuevamente.', 'error');
    }
  };

  return (
    <div className='px-[550px] py-28 w-full h-full'>
      <div className="mb-20">
        <h1 className='text-3xl text-black font-bold'>Control de Asistencia</h1>
      </div>
      <Card className="p-6 mb-10">
        <h5 className="mb-4">Marcar Asistencia</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Fecha</label>
            <Input
              type="date"
              name="fecha"
              value={attendance.fecha}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Hora de Entrada</label>
            <Input
              type="time"
              name="hora_entrada"
              value={attendance.hora_entrada}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Hora de Salida</label>
            <Input
              type="time"
              name="hora_salida"
              value={attendance.hora_salida}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">ID del Tipo de Asistencia</label>
            <Input
              type="text"
              name="tipo_asistencia"
              value={attendance.tipo_asistencia}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </div>
          <Button type="submit" variant="contained" color="blue">
            Marcar Asistencia
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default DashboardEmpleado;