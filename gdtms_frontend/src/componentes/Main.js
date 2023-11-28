import { Contexto } from "../Contexto";
import { useContext, useEffect, useState } from "react";
import { Tarea } from "./Tarea";
import {Proximo} from './Proximo';
import { GestionarEt } from "./GestionarEt";
import axios from 'axios';
import {format} from 'date-fns';
import { TokenContext } from "../contexts/TokenContext";
import { MainContext } from '../contexts/MainContext';

export function Main(props) {

  //CONTEXTO:
  //ERRORES:
    //CREAR TAREA NI EDITAR NO ESTAN FUNCIONANDO
    //TAMPOCO EJECUTAN VERIFICARTOKEN()
    //MAIN NO ESTA GESTIONANDO BIEN TAREAS CONSULTA
  //SUGERENCIAS:
    //USAR USEFORMDATA() EN Busqueda.js
    //MEJORAR UN POCO EL BACK Y LIMPIAR CONSOLE.LOG QUE NO ESTEN APORTANDO
    //ELIMINAR USESTATE TEXTOBUSQUEDA Y USAR HANDLETAREASCONSULTA MANDANDO UN OBJETO
    //PONER ACTUALIZARMAIN DENTRO DE HANDLETAREASCONSULTA
    //PROBAR HANDLETAREASCONSULTA DESDE EL CONTEXTO
    //MANDAR ID DE USUARIO POR QUERY Y DEVOLVER LAS TAREAS QUE TENGAN ESE ID

  const {token} = useContext(TokenContext);

  const {actualizacion, setActualizacion, actualizarMain} = useContext(MainContext);
  
  const { tareasConsulta, textoBusqueda} = useContext(Contexto);

  const [tareasMostradas, setTareasMostradas] = useState([]);

  useEffect(() => {
    console.log("tareasConsulta: ", tareasConsulta);
    handleTareasConsulta();
  }, [tareasConsulta]);

  useEffect(()=>{
    if(actualizacion == true){
      /* setTareasMostradas([]) */
      handleTareasConsulta();
      setActualizacion(false);
      console.log("Se ha re-renderizado main con los datos actualizados.")
    }
  },[actualizacion])

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

//COMPROBAR SI ES UN STRING (INBOX, HOY, PROXIMO, GESTIONAR) O UN OBJETO (BUSQUEDA, ETIQUETA);


//PONER UN MIDDLEWARE EN EL BACKEND QUE PIDA EL USUARIO PARA DEVOLVER SUS TAREAS
//VERIFICARTOKEN EN CADA OPERACION Y SI ES INVALIDO DEVOLVRTE AL LOGIN
  const handleTareasConsulta = async () =>{
    console.log("Se ha ejecutado handleTareasConsulta");
    console.log("handleTareasConsulta dice que tareasConsulta es :", tareasConsulta);
    console.log("handleTareasConsulta dice que tareasMostradas es :", tareasMostradas);
    const idUsuario = await axios.post("http://localhost:3001/usuarios/obtener", {token});
    setTareasMostradas([]);
    if(tareasConsulta === "proximo" || tareasConsulta === "gestionar"){
      console.log("HANDLETAREASCONSULTA() SE HA IDO POR EL CAMINO DE PROXIMO o GESTIONAR")
    }
    if (tareasConsulta === "inbox") {
      console.log("HANDLETAREASCONSULTA() SE HA IDO POR EL CAMINO DE INBOX")
      const inboxRes = await axios.get("http://localhost:3001/tareas/inbox");
      const inboxArray = inboxRes.data.result;
      setTareasMostradas(inboxArray);
    }
    else if(tareasConsulta === "hoy"){
      console.log("HANDLETAREASCONSULTA() SE HA IDO POR EL CAMINO DE HOY")
      const hoyRes = await axios.get("http://localhost:3001/tareas/hoy");
      const hoyArray = hoyRes.data.result;
      console.log("El array de las tareas de hoy: ", hoyArray);
      formatearFechas(hoyArray);
      setTareasMostradas(hoyArray);
    }
    else if(tareasConsulta === "busqueda"){
      console.log("HANDLETAREASCONSULTA() SE HA IDO POR EL CAMINO DE BUSQUEDA")
      const busquedaRes = await axios.post("http://localhost:3001/tareas/buscar", {textoBusqueda});
      console.log("El texto enviado por la busqueda es:", busquedaRes);
      const busquedaArray = busquedaRes.data.result;
      formatearFechas(busquedaArray);
      setTareasMostradas(busquedaArray);
    }
    else{
      console.log("HANDLETAREASCONSULTA() SE HA IDO POR EL CAMINO DE ETIQUETAS")
      console.log("tareasConsulta(que deberia contener una etiqueta) contiene: ", tareasConsulta);
      const idEtiquetaRes = await axios.get(`http://localhost:3001/etiquetas/getId?nomEtiqueta=${tareasConsulta}`);
      const idEtiqueta = idEtiquetaRes.data[0].id_etiqueta;
      console.log("idEtiqueta: ", idEtiqueta);
      const tareasEtiquetaRes = await axios.get(`http://localhost:3001/tareas/etiqueta?idEtiqueta=${idEtiqueta}`)
      console.log("tareaEtiquetaRes ha devuelto: ", tareasEtiquetaRes.data);
    }

  }

  return (
    <div className="contenedorMain col">
      <button onClick={()=> actualizarMain()}>actualizarMain</button>
      {tareasMostradas ? (
        tareasMostradas.map((tarea, i) => (
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
        ))) : <p>No hay tareas...</p>
      }

      {tareasConsulta === "proximo" && <Proximo formatearFechas={formatearFechas} setTareasMostradas={setTareasMostradas}/>}
      {tareasConsulta === "gestionar" && <GestionarEt />}
    </div>
  );
}
