import {useState, useEffect} from 'react'
import Mensaje from './Mensaje'
import cerrarModal from '../src/img/cerrar.svg'
const Modal = ({setModal, animarModal,setAnimarModal, guardarGasto,gastoEditar, setGastoEditar}) => {
  
  const [mensaje, setMensaje] = useState("")
  const [gasto, setGasto] = useState("")
  const [cantidad, setCantidad] = useState("")
  const [categoria, setCategoria] = useState("")
  const [id, setId] = useState("")
  const [fecha, setFecha] = useState("")
  
  useEffect(() =>{
   
    if(Object.keys(gastoEditar).length > 0) {
      setGasto(gastoEditar.gasto)
      setCantidad(gastoEditar.cantidad)
      setCategoria(gastoEditar.categoria)
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)
   }
  },[])

  const handleCerrar = () => {
    setGastoEditar({})
    setAnimarModal(false)
    
    setTimeout(()=>{
      setModal(false);
    },500)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if([gasto,cantidad, categoria]. includes("")){
      setMensaje("Todos los campos son requeridos");
      
      setTimeout(()=>{
        setMensaje("")
      },2000)

      return
    }
    
    guardarGasto({
      gasto,
      cantidad,
      categoria,
      id,
      fecha

    })

  }

  return (
    <div className='modal'>
      <div className="cerrar-modal">
        <img src={cerrarModal} alt="cerrar" onClick={handleCerrar} />
      </div>
      <form className={`formulario ${animarModal ? "animar" : "cerrar"}`} onSubmit={handleSubmit}>
      {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        <legend>{gastoEditar.gasto ? "Editar Gasto " : "Nuevo Gasto"}</legend>
        <div className="campo">
          <label htmlFor="gasto">Nombre</label>
          <input type="text" placeholder='Ingresa tu Gasto: Ej. Comida' id='gasto' value={gasto} onChange={(e)=> setGasto(e.target.value)}/>
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input type="number" placeholder='Ingresa la cantidad: Ej. 300' id='cantidad' value={cantidad} onChange={e =>setCantidad(Number(e.target.value))}/>
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <select name="categoria" id="categoria" value={categoria} onChange={e=> setCategoria(e.target.value)}>
            <option value="">--Seleccione--</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>

          <input type="submit" value={gastoEditar.gasto ? "Guardar Cambios " : "Agregar"}/>
        </div>

      </form>
    </div>
  )
}

export default Modal