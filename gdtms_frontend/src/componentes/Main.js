import { Contexto } from "../Contexto";
import { useContext, useEffect } from "react";
import { Tarea } from "./Tarea";
import { tareas } from "../datosSimulados/tareas";
import { GestionarEt } from "./GestionarEt";

export function Main(props) {
  
  const { tareasConsulta, setTareasConsulta } = useContext(Contexto);

  let tareasMostradas = [];

/*   useEffect(() => {
    console.log(tareasConsulta);
  }, [tareasConsulta]); */

  if (tareasConsulta == "inbox") {
    tareasMostradas = [];
    const tareasInbox = tareas.filter((tarea) => tarea.fecha == "");
    tareasMostradas.push(...tareasInbox);
    console.log(tareasMostradas)
  }

  if (tareasConsulta == "hoy") {
    tareasMostradas = [];
    const fechaActual = new Date();
    console.log(fechaActual)
    const tareasHoy = tareas.filter((tarea) =>{
      const fechaTarea = new Date(tarea.fecha);
      console.log(fechaTarea)
      return fechaTarea.getTime() === fechaActual.getTime()
    });
    console.log("Tareas Hoy", tareasHoy);
    tareasMostradas.push(...tareasHoy)
    console.log("Tareas Mostradas", tareasMostradas);
  }

  if(tareasConsulta == "proximo"){
    alert("que onda perro")
  }

  if(tareasConsulta == "gestionar"){
    alert("que onda pa")
  }

  else{
    const etiquetaRecibida = tareasConsulta;
    tareasMostradas = [];
    const tareasEtiqueta = tareas.filter(tarea => tarea.etiqueta == etiquetaRecibida);
    tareasMostradas.push(...tareasEtiqueta);
    /* console.log(tareasMostradas) */
  }

  return (
    <div className="contenedorMain col">
      {tareasMostradas.length > 0
        ? tareasMostradas.map((tarea, i) => (
            <Tarea
              key={i}
              prioridad={tarea.prioridad}
              titulo={tarea.titulo}
              fecha={tarea.fecha}
              etiqueta={tarea.etiqueta}
              descripcion={tarea.descripcion}
            />
          ))
        : null}
      {tareasConsulta === "proximo" ? <span>Proximo</span> : null}
      {tareasConsulta === "gestionar" ? <GestionarEt /> : null}
    </div>
  );
}
