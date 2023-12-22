import { useState, useEffect, useContext } from "react";
import { ModalContext } from '../contexts/ModalContext';
import { MainContext } from "../contexts/MainContext";
import { useEtiqueta } from "../hooks/useEtiqueta";
import axios from 'axios';

export function Tarea({estadoTarea, idUsuario, prioridad, nombre, fecha, fechaVista, idTarea, idEtiqueta, descripcion}) {

  const {actualizarTareas} = useContext(MainContext);

  const {abrirModalTarea, handleDatosTarea} = useContext(ModalContext);
  
  const {getNomEtiqueta, getColor} = useEtiqueta();

  const eliminarTarea = async ()=>{
    let confirmar = window.confirm("Estas seguro de eliminar esta tarea?");
    if(confirmar === true){
      axios.delete(`http://localhost:3001/tareas?idTarea=${idTarea}`)
      .then((res)=> actualizarTareas() )
      .catch((err)=> console.log("Hubo un error al eliminarTarea: ", err) )
    }
    else return
  }

  const [estado, setEstado] = useState(0);

  const toggleEstado = ()=>{
    if(estado == 0){
      //Completar la tarea
      axios.put("http://localhost:3001/tareas/completar", {idTarea, estado: 1})
      .then((res)=>{
        setEstado(1);
      }).catch((err)=> console.log("Ha ocurrido un error en toggleEstado: ", err))
    }
    else{
      axios.put("http://localhost:3001/tareas/completar", {idTarea, estado: 0})
      .then((res)=>{
        setEstado(0);
      }).catch((err)=> console.log("Ha ocurrido un error en toggleEstado: ", err))
    }
  }
  
  useEffect(()=>{
    setEstado(estadoTarea);
  },[])

  return (
    <div className={`contenedorTarea col cen ${estado == 1 ? "completa" : `p${prioridad}`}`}>
      <div className="seccionTarea superior row cen">
        <div className="info cen">
          <input type="checkbox" className="estadoTarea" checked={estado == 1 ? true : false} onChange={()=>{
            toggleEstado();
            actualizarTareas();
          }} />
          <span className="nombreTarea">{nombre}</span>
        </div>
        <div className="acciones row">
          <span className="accion" onClick={()=>{
            handleDatosTarea({idUsuario, idTarea, idEtiqueta, nombre, prioridad, fecha, descripcion});
            abrirModalTarea("editar");
          }}>
            <i className="fa-solid fa-pen-to-square"></i>
          </span>
          <span className="accion" onClick={eliminarTarea}>
            <i className="fa-solid fa-trash-can"></i>
          </span>
        </div>
      </div>
      <div className="seccionTarea medio row">
        <span className="fecha row">
          <i className="fa-regular fa-calendar"></i>
          {fechaVista == null ? "Sin Fecha" : fechaVista}
        </span>
        <span className="etiqueta" style={{backgroundColor: getColor(idEtiqueta)}}>{getNomEtiqueta(idEtiqueta)}</span>
      </div>
      <div className="seccionTarea row">
        <span className="desc">{descripcion == null ? "Sin descripcion..." : descripcion}</span>
      </div>
    </div>
  );
}
