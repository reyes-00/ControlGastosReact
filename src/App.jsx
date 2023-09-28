import { useState, useEffect } from 'react'
import Header from '../components/Header'
import ListadoGastos from '../components/ListadoGastos'
import {formatearFecha, generarId} from '../helpers/index'
import icnonoNuevoGasto from './img/nuevo-gasto.svg';
import Modal from '../components/Modal';
import Filtros from '../components/Filtros'

function App() {

  const [presupuesto, setPresupuesto] = useState(localStorage.getItem('presupuesto')?? 0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  let [gastosVarios, setGastosVarios] = useState(
    localStorage.getItem("gastosVarios") ? JSON.parse(localStorage.getItem("gastosVarios")) : []
  ) 
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState("")
  const [gastosFiltrados, setGastosFiltrados] = useState([])
  
  useEffect(() =>{
    if(filtro){
      const filtroGastos = gastosVarios.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(filtroGastos);
    }
  },[filtro])
  const handleModal = () =>{
    setGastoEditar({})
    setModal(true)
    
    setTimeout(()=>{
      setAnimarModal(true)
    },500)
  }

  useEffect(()=>{
    if(Object.keys(gastoEditar).length > 0){
      setModal(true)
    
      setTimeout(()=>{
        setAnimarModal(true)
      },500)
    }
  },[gastoEditar])

  const guardarGasto = (gasto) =>{
    if(gasto.id){
      const gastosActualizados = gastosVarios.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState);
      setGastosVarios(gastosActualizados)
      setGastoEditar({})
    }else{
      gasto.id= generarId();
      gasto.fecha= formatearFecha(Date.now());
      setGastosVarios([...gastosVarios, gasto])
    }
    
    
      setAnimarModal(false)
      setTimeout(()=>{
        setModal(false);
      },500)

  }

  const eliminarGasto = (id) => {
    const datosActualizados = gastosVarios.filter( gasto => {
      return gasto.id !== id;
    })
    setGastosVarios(datosActualizados)
  }


  //localStorage
  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0)
  },[presupuesto])

  useEffect(() => {
    localStorage.setItem("gastosVarios", JSON.stringify(gastosVarios) ?? [])
  },[gastosVarios])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto") ?? 0)

    if(presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  },[])
  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        presupuesto = {presupuesto}
        setPresupuesto = {setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastosVarios={gastosVarios}
        setGastosVarios={setGastosVarios}

      />
      {isValidPresupuesto && 
      <>
        <main>
          <Filtros
            filtro={filtro}
            setFiltro={setFiltro}
          />
          <ListadoGastos 
            gastosVarios={gastosVarios}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
            filtro={filtro}
            gastosFiltrados={gastosFiltrados}
          />
        </main>
          <div className='nuevo-gasto'>
            <img src={icnonoNuevoGasto} alt="nuevo gasto" onClick={handleModal} />
          </div>
      </>
      }

      {modal && <Modal
                    setModal= {setModal}
                    animarModal= {animarModal}
                    setAnimarModal={setAnimarModal}
                    guardarGasto= {guardarGasto}
                    gastoEditar={gastoEditar}
                    setGastoEditar={setGastoEditar}
                />
      }
    </div>
  )
}

export default App
