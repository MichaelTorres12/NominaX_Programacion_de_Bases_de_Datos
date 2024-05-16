import {TableWithStripedColumns} from '../../../componentes/comunes/Tabla';
import './GestionEmpleados.css'

export const GestionEmpleados = () => {
  return (
    <div className='backgroundStyle px-36 py-28 w-ful h-full'>

      <div>
        <h1 className='mb-20 text-3xl text-black font-bold'>Gestión de Empleados</h1>

        <TableWithStripedColumns />
      </div>
      

    </div>
  )
}

export default GestionEmpleados;