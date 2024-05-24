
import { useState } from 'react';
import { Card, Button, Input, Textarea } from "@material-tailwind/react";

const DashboardEmpleado = () => {
  const [attendance, setAttendance] = useState({
    entrada: '',
    salida: '',
    justificacion: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAttendance({ ...attendance, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar la asistencia o justificación
    console.log(attendance);
  };

  return (
    <div className='px-[550px] py-28 w-full h-full'>
      <div className="mb-20">
        <h1 className='text-3xl text-black font-bold'>Control de Asistencia</h1>
      </div>

      <Card className="p-6 mb-10">
        <h5  className="mb-4">Marcar Asistencia</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Hora de Entrada</label>
            <Input
              type="time"
              name="entrada"
              value={attendance.entrada}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Hora de Salida</label>
            <Input
              type="time"
              name="salida"
              value={attendance.salida}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          <Button type="submit" variant="contained" color="blue">
            Marcar Asistencia
          </Button>
        </form>
      </Card>

      <Card className="p-6 mb-10">
        <h5 className="mb-4">Justificación de Ausencia</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Descripción de la Justificación</label>
            <Textarea
              name="justificacion"
              value={attendance.justificacion}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          <Button type="submit" variant="contained" color="blue">
            Enviar Justificación
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h5  className="mb-4">Historial de Asistencias</h5>
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-b p-4">Fecha</th>
              <th className="border-b p-4">Hora de Entrada</th>
              <th className="border-b p-4">Hora de Salida</th>
              <th className="border-b p-4">Justificación</th>
              <th className="border-b p-4">Estado</th>
            </tr>
          </thead>
          <tbody>
            {/* Renderizar el historial de asistencias aquí */}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default DashboardEmpleado;
