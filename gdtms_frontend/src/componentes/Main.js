import { Contexto } from "../Contexto";
import { useContext, useEffect, useState } from "react";
import { Tarea } from "./Tarea";
import { GestionarEt } from "./GestionarEt";
import axios from 'axios';

export function Main(props) {
  
  const { tareasConsulta, setTareasConsulta } = useContext(Contexto);

  const [tareasMostradas, setTareasMostradas] = useState([]);

  useEffect(() => {
    console.log(tareasConsulta);
    handleTareasConsulta();
    console.log(tareasMostradas);
  }, [tareasConsulta]);

  const handleTareasConsulta = async () =>{
    setTareasMostradas([]);
    if (tareasConsulta == "inbox") {
      const inboxRes = await axios.get("http://localhost:3001/tareas/inbox");
      const inboxArray = inboxRes.data.result;
      setTareasMostradas(inboxArray);
    } 
    else if(tareasConsulta == "hoy"){
      const hoyRes = await axios.get("http://localhost:3001/tareas/hoy");
      const hoyArray = hoyRes.data.result;
      setTareasMostradas(hoyArray);
    }
    else if(tareasConsulta == "proximo"){
      const proximoRes = await axios.get("http://localhost:3001/tareas/proximo");
      const proximoArray = proximoRes.data.result;
      setTareasMostradas(proximoArray);
    }

  }

  return (
    <div className="contenedorMain col">
      {tareasMostradas.length > 0
        ? tareasMostradas.map((tarea, i) => (
            <Tarea
              key={i}
              estado={tarea.estado}
              prioridad={tarea.prioridad}
              nombre={tarea.nombre}
              fecha={tarea.fecha}
              idTarea={tarea.id_tarea}
              idEtiqueta={tarea.id_etiqueta}
              descripcion={tarea.descripcion}
            />
          ))
        : null}
      {tareasConsulta === "gestionar" ? <GestionarEt /> : null}
    </div>
  );
}

    /*   if (tareasConsulta == "hoy") {
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
      } */
    
    /*   if(tareasConsulta == "proximo"){
        alert("que onda perro")
      } */
    
    /*   if(tareasConsulta == "gestionar"){
        alert("que onda pa")
      } */
    
    /*   else{
        const etiquetaRecibida = tareasConsulta;
        tareasMostradas = [];
        const tareasEtiqueta = tareas.filter(tarea => tarea.etiqueta == etiquetaRecibida);
        tareasMostradas.push(...tareasEtiqueta);
        console.log(tareasMostradas)
      } */