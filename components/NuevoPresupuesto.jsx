import { useState } from "react";
import Mensaje from './Mensaje'

const nuevoPresupuesto = ({presupuesto, setPresupuesto,isValidPresupuesto, setIsValidPresupuesto}) => {
const [mensaje, setMensaje] = useState("")

  const handleSubmit=(e)=>{
    e.preventDefault();

    if(!presupuesto || presupuesto < 0){
      setMensaje("Presupuesto No Valido")
      return
    }
    
    setMensaje("")
    setIsValidPresupuesto(true)
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form onSubmit={handleSubmit} className='formulario' action="">
        <div className="campo">
          <label htmlFor="">Presupuesto</label>
          <input type="number" name="" className='nuevo-presupuesto' placeholder='Agrega tu presupuesto' id="" onChange={(e)=> setPresupuesto(Number(e.target.value))} value={presupuesto}/>
        </div>
        <input type="submit" value="Agregar" />
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  )
}

export default nuevoPresupuesto