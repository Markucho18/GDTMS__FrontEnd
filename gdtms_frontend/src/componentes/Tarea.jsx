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
    <li
      className={`p-3 m-1     contenedorTarea col cen ${estado == 1 ? "completa" : `p${prioridad}`}`}
      style={{boxShadow: "0px 0px 3px 0px rgba(0, 0, 0, 70%)"}}  
    >
      <section className="flex items-center justify-between w-full mb-2 truncate">
        <div className="flex items-center justify-center gap-2">
          <input type="checkbox" className="estadoTarea" checked={estado == 1 ? true : false} onChange={()=>{
            toggleEstado();
            actualizarTareas();
          }} />
          <p className="text-xl">{nombre}</p>
        </div>
        <div className="flex gap-3 items-center">
          <button className="rounded border-[1px] border-black py-1 px-2 hover:bg-gray-100" onClick={()=>{
            handleDatosTarea({idUsuario, idTarea, idEtiqueta, nombre, prioridad, fecha, descripcion});
            abrirModalTarea("editar");
          }}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button className="rounded border-[1px] border-black py-1 px-2 hover:bg-gray-100" onClick={eliminarTarea}>
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </section>
      <section className="flex w-full gap-3 items-center">
        <p className="flex gap-1 items-center text-lg">
          <i className="fa-regular fa-calendar"></i>
          {fechaVista == null ? "Sin Fecha" : fechaVista}
        </p>
        <p className="p-1 rounded text-lg" style={{backgroundColor: getColor(idEtiqueta)}}>{getNomEtiqueta(idEtiqueta)}</p>
      </section>
      <section className="flex w-full">
        <p className="desc">{descripcion == null ? "Sin descripcion..." : `${descripcion.slice(0, 60)}...`}</p>
      </section>
    </li>
  );
}
