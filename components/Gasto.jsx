import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import IconoAhorro from '../src/img/icono_ahorro.svg'
import IconoCasa from '../src/img/icono_casa.svg'
import IconoComida from '../src/img/icono_comida.svg'
import IconoGastos from '../src/img/icono_gastos.svg'
import IconoOcio from '../src/img/icono_ocio.svg'
import IconoSalud from '../src/img/icono_salud.svg'
import IconoSuscripciones from '../src/img/icono_suscripciones.svg'



const diccionarioImagenes = {
  ahorro : IconoAhorro,
  comida : IconoComida,
  casa : IconoCasa,
  gastos : IconoGastos,
  ocio : IconoOcio,
  salud : IconoSalud,
  suscripciones : IconoSuscripciones
}

const Gasto = ({gasto, setGastoEditar,eliminarGasto}) => {
  
  const{categoria,gasto:nombreGasto,fecha,cantidad, id} = gasto
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setGastoEditar(gasto)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  );
  
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => eliminarGasto(id)}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );


  return (
    <SwipeableList>
      <SwipeableListItem  
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={`${diccionarioImagenes[categoria]}`} alt={`${nombreGasto}`} />
            <div className="descripcion-gasto">
              <p className="categoria">{categoria}</p>
              <p className="nombre-gasto">{nombreGasto}</p>
              <p className="fecha-gasto">Agregado el: {fecha}</p>
            </div>
          </div>
            <p className="cantidad-gasto">$ {cantidad}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default Gasto