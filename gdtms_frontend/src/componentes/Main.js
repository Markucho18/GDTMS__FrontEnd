import { Contexto } from "../Contexto";
import { useContext, useEffect, useState } from "react";
import { Tarea } from "./Tarea";
import { GestionarEt } from "./GestionarEt";
import axios from 'axios';
import {format} from 'date-fns';

export function Main(props) {
  
  const { token, tareasConsulta, actualizarMain, setActualizarMain, textoBusqueda } = useContext(Contexto);

  const [tareasMostradas, setTareasMostradas] = useState([]);

  useEffect(() => {
    handleTareasConsulta();
  }, [tareasConsulta]);

  useEffect(()=>{
    console.log("Se ha re-renderizado main con los datos actualizados");
    handleTareasConsulta();
    setActualizarMain(false);
  }, [actualizarMain]);

  const formatearFechas = (array) =>{
    return array.map((tarea, i)=>{
      const fechaBack = new Date(tarea.fecha);
      const fechaVista = format(fechaBack, 'dd/MM/yy');
      const fechaValue = format(fechaBack, 'yyyy-MM-dd')
      tarea.fechaVista = fechaVista;
      tarea.fecha = fechaValue;
      return tarea
    })
  }

  //EN VERDAD DEBERIAN SER TODOS POST, PQ LE TENGO QUE MANDAR EL IDUSUARIO PARA QUE COMPRUBE SI SON MIAS LAS TAREAS
  const handleTareasConsulta = async () =>{
    await axios.post("http://localhost:3001/usuarios/obtener", {token});
    setTareasMostradas([]);
    if (tareasConsulta === "inbox") {
      const inboxRes = await axios.get("http://localhost:3001/tareas/inbox");
      const inboxArray = inboxRes.data.result;
      setTareasMostradas(inboxArray);
    } 
    else if(tareasConsulta === "hoy"){
      const hoyRes = await axios.get("http://localhost:3001/tareas/hoy");
      const hoyArray = hoyRes.data.result;
      console.log("El array de las tareas de hoy: ", hoyArray);
      formatearFechas(hoyArray);
      setTareasMostradas(hoyArray);
    }
    else if(tareasConsulta === "proximo"){
      const proximoRes = await axios.get("http://localhost:3001/tareas/proximo");
      const proximoArray = proximoRes.data.result;
      console.log("El array de las proximas tareas: ", proximoArray);
      formatearFechas(proximoArray);
      setTareasMostradas(proximoArray);
    }
    else if(tareasConsulta === "busqueda"){
      const busquedaRes = await axios.post("http://localhost:3001/tareas/buscar", {textoBusqueda});
      console.log(busquedaRes);
      const busquedaArray = busquedaRes.data.result;
      formatearFechas(busquedaArray);
      setTareasMostradas(busquedaArray);
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
              fechaVista={tarea.fechaVista}
              idTarea={tarea.id_tarea}
              idEtiqueta={tarea.id_etiqueta}
              descripcion={tarea.descripcion}
              idUsuario={tarea.id_usuario}
            />
          ))
        : null}
      {tareasConsulta === "gestionar" ? <GestionarEt /> : null}
    </div>
  );
}
