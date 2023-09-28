import { useEffect, useState } from 'react'
import {formatearCantidad} from '../helpers/index'
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({presupuesto, gastosVarios, setPresupuesto, setGastosVarios, setIsValidPresupuesto}) => {
  
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)
  const[ porcentaje, setPorcenctaje] = useState(0) 
  
  useEffect(()=> {
    const totalGastado = gastosVarios.reduce((total, gasto)=> gasto.cantidad + total, 0)
    const totalDisponible = presupuesto - totalGastado

    //calcular el porcentaje gastado
    const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)
  

    setDisponible(totalDisponible);
    setGastado(totalGastado)
    setTimeout(()=>{setPorcenctaje(nuevoPorcentaje)},1000)
  },[gastosVarios])

  const handleResetApp = () =>{
    const respuesta = confirm("¿Estas seguro que quieres Reiniciar?")

    if(respuesta){
      setPresupuesto(0)
      setGastosVarios([])
      setIsValidPresupuesto(false)

    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar 
          styles={buildStyles({
              pathColor: porcentaje > 100 ? "#DC2626" : '#3B82F6',
              trailColor: "#F5F5F5",
              textColor : porcentaje > 100 ? "#DC2626" : '#3B82F6',
            })} 
            text={`${porcentaje} % Gastado`}
            value={porcentaje}/>
      </div>
      <div className="contenido-presupuesto">
        <button className='reset-app' onClick={handleResetApp}>Reiniciar App</button>
        <p>
          <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : "" } `}>
          <span>Disponible: </span>{formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span>{formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  )
}

export default ControlPresupuesto