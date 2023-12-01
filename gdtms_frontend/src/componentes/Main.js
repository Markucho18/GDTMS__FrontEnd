//CONTEXTO:
//ERRORES:
  //DPS DE UN RATO DE CAMBIAR ENTRE CONSULTAS, SE JODE TODO Y NO ANDA NADA.
  //CREAR TAREA NI EDITAR NO ESTAN FUNCIONANDO
  //TAMPOCO EJECUTAN VERIFICARTOKEN()
  //MAIN NO ESTA GESTIONANDO BIEN TAREAS CONSULTA
//SUGERENCIAS:
  //ACTUALIZARMAIN SOLO ACTUALIZA MAIN

  //USAR USEFORMDATA() EN Busqueda.js
  //MANDAR ID DE USUARIO POR QUERY Y DEVOLVER LAS TAREAS QUE TENGAN ESE ID

import { useContext, useEffect} from "react";
import { Tarea } from "./Tarea";
import { MainContext } from '../contexts/MainContext';

export function Main() {

  const {consulta, actualizacion, setActualizacion, actualizarMain, tareasMostradas } = useContext(MainContext);
  
  /* const { textoBusqueda } = useContext(Contexto); */

  //ESTE EFFECT SOLO ES LLAMADO POR CREARTAREA O EDITARTAREA
  useEffect(()=>{
    if(actualizacion === true){
      setActualizacion(false);
      console.log("Se ha re-renderizado main con los datos actualizados.")
    }
  },[actualizacion])
  //IDEA: EN VEZ DE FORZAR UNA ACTUALIZACION, HACER QUE CREAR Y EDITARTAREA DEVUELVAN UNA TAREA,
  //LA AGREGUEN A TAREASMOSTRADAS Y ACTUALIZEN ASI MAIN.

  //MAIN SOLO LIMITA A RENDERIZARSE CUANDO CAMBIA TAREASMOSTRADAS
  useEffect(()=>{
    console.log("En Main.js tareasMostradas cambio su valor a: ", tareasMostradas); 
  },[tareasMostradas])
  
  return (
    <div className="contenedorMain col">
      <button onClick={()=> actualizarMain()}>actualizarMain</button>
      {tareasMostradas && tareasMostradas.length > 0 ? (
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
      
      {/* {consulta === "proximo" && <Proximo />}
      {consulta === "gestionar" && <GestionarEt />} */}

    </div>
  );
}


      //COMPROBAR SI ES UN STRING (INBOX, HOY, PROXIMO, GESTIONAR) O UN OBJETO (BUSQUEDA, ETIQUETA);
      
      
      //PONER UN MIDDLEWARE EN EL BACKEND QUE PIDA EL USUARIO PARA DEVOLVER SUS TAREAS
      //VERIFICARTOKEN EN CADA OPERACION Y SI ES INVALIDO DEVOLVRTE AL LOGIN
        /* const handleTareasConsulta = async () =>{
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
      
        } */