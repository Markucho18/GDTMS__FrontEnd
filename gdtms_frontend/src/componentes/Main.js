import { Contexto } from "../Contexto";
import { useContext, useEffect } from "react";
import { Formulario } from "./Formulario";
import { Tarea } from "./Tarea";
import { tareas } from '../datosSimulados/tareas'
import { GestionarEt } from "./GestionarEt";

export function Main(props) {

  const { tareasConsulta, setTareasConsulta } = useContext(Contexto);

  let tareasMostradas = []

  useEffect(() => {
    console.log(tareasConsulta);
  }, [tareasConsulta]);

  useEffect(() =>{
    console.log(tareasMostradas)
  }, [tareasMostradas])

  const mostrarListaTareas = (arr)=>{
    return (
      <div className="listaTareas col">
      {arr.map((tarea, i) => {
          return (
            <Tarea
              key={i}
              prioridad={tarea.prioridad}
              titulo={tarea.titulo}
              fecha={tarea.fecha}
              etiqueta={tarea.etiqueta}
              descripcion={tarea.descripcion}
            />
          );
        })}
      </div>
    )
  }

  //SEGUN QUE CASO SE AÑADEN TAREAS A tareasMostradas Y LO QUE HACE EL COMPONENTE ES SIMPLEMENTE LEER EL ARRAY
  //DESPUES DE QUE CAMBIE EL ARRAY (useEffect) SE VACIA Y SE PUSHEA LO NUEVO

  if(tareasConsulta == "hoy"){
    const tareasHoy = tareas.filter(tarea => tarea.fecha == "06/11/2023");
    tareasHoy.map(tarea => tareasMostradas.push(tarea));
  }

  return (
    <div className="contenedorMain col">

      {tareasConsulta === "inbox" ? (
        <span>Inbox</span>
      ) : null}

      {tareasConsulta === "hoy" ? (
        <span>Hoy</span>
        /* mostrarListaTareas(tareasHoy) */
      ) : null}

      {tareasConsulta === "proximo" ? (
        <span>Proximo</span>
      ) : null}

      {tareasConsulta === "gestionar" ? (
        <GestionarEt/>
      ) : null}

      

    </div>
  );
}
