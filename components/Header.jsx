import NuevoPresupuesto from './nuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'
const Header = ({presupuesto, setPresupuesto,isValidPresupuesto, setIsValidPresupuesto, gastosVarios, setGastosVarios}) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>
      {isValidPresupuesto ? 
      <ControlPresupuesto
        gastosVarios={gastosVarios}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        setGastosVarios={setGastosVarios}
        setIsValidPresupuesto={setIsValidPresupuesto}
      /> : 
      <NuevoPresupuesto
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
    }
    </header>
  )
}

export default Header