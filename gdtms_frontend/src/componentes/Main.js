import { Contexto } from "../Contexto";
import { useContext, useEffect } from "react";
import { Tarea } from "./Tarea";
import { tareas } from "../datosSimulados/tareas";
import { GestionarEt } from "./GestionarEt";

export function Main(props) {
  const { tareasConsulta, setTareasConsulta } = useContext(Contexto);

  let tareasMostradas = [];

    useEffect(() => {
    console.log(tareasConsulta);
  }, [tareasConsulta]);

  /*   useEffect(() =>{
    console.log(tareasMostradas)
  }, [tareasMostradas]) */

  //CAMBIAR NOMBRE A TAREACONSULTA
  //SEGUN QUE CASO SE AÑADEN TAREAS A tareasMostradas Y LO QUE HACE EL COMPONENTE ES SIMPLEMENTE LEER EL ARRAY
  //DESPUES DE QUE CAMBIE EL ARRAY (useEffect) SE VACIA Y SE PUSHEA LO NUEVO

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

    console.log("Tareas Hoy");
    console.log(tareasHoy);
    tareasMostradas.push(...tareasHoy)
    console.log("Tareas Mostradas");
    console.log(tareasMostradas);
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
