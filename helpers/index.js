const generarId=()=> { 
  const dato = Math.random().toString(36).substr(2)
  const fecha = Date.now().toString(36)
  return dato + fecha
}

const formatearFecha = function(fecha){
  const fechaNueva = new Date(fecha)
  const opciones = {
    year: "numeric",
    month: "long",
    day: "2-digit"
  }

  return fechaNueva.toLocaleDateString("es-ES",opciones)
}

//Formatear Dinero del presupuesto
const formatearCantidad = function(cantidad){
    return cantidad.toLocaleString("en-US",{
      style: "currency",
      currency: "USD"
    })
  }
  

export {
  generarId,
  formatearFecha,
  formatearCantidad
}