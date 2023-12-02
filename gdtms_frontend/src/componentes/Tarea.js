import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { ModalContext } from '../contexts/ModalContext';
import { MainContext } from "../contexts/MainContext";

export function Tarea({idUsuario, prioridad, nombre, fecha, fechaVista, idTarea, idEtiqueta, descripcion}) {

  const {actualizarTareas} = useContext(MainContext);

  const {abrirModalTarea, handleDatosTarea} = useContext(ModalContext);

  const [nomEtiqueta, setNomEtiqueta] = useState("");
  const getNomEtiqueta = async () => {
    axios.get(`http://localhost:3001/etiquetas/getNombre?idEtiqueta=${idEtiqueta}`)
    .then((etiquetaRes)=>{
      const etiquetaResSQL = etiquetaRes.data?.result;
      if(etiquetaResSQL.length > 0) setNomEtiqueta(etiquetaResSQL[0].nombre)
    }).catch((err)=> console.log("Hubo un error en getNomEtiqueta: ", err))
  };
  
  const eliminarTarea = async ()=>{
    let confirmar = window.confirm("Estas seguro de eliminar esta tarea?");
    if(confirmar === true){
      axios.delete(`http://localhost:3001/tareas?idTarea=${idTarea}`)
      .then((res)=> actualizarTareas() )
      .catch((err)=> console.log("Hubo un error al eliminarTarea: ", err) )
    }
    else return
  }
  
  useEffect(()=>{
    getNomEtiqueta();
  })

  return (
    <div className={`contenedorTarea col cen p${prioridad}`}>
      <div className="seccionTarea superior row cen">
        <div className="info cen">
          <input type="checkbox" className="estadoTarea" />
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
        <span className="etiqueta">{nomEtiqueta.length > 0 ? nomEtiqueta : "Sin Etiqueta"}</span>
      </div>
      <div className="seccionTarea row">
        <span className="desc">{descripcion == null ? "No hay descripcion..." : descripcion}</span>
      </div>
    </div>
  );
}
