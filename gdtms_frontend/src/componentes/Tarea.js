import {Contexto} from '../Contexto';
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { ModalContext } from '../contexts/ModalContext';

export function Tarea({idUsuario, prioridad, nombre, fecha, fechaVista, idTarea, idEtiqueta, descripcion}) {

  const {abrirModalTarea, handleDatosTarea} = useContext(ModalContext);

  const {setActualizarMain} = useContext(Contexto);

  const [nomEtiqueta, setNomEtiqueta] = useState("");
  const getEtiquetas = async () => {
    const etiquetasRes = await axios.get(`http://localhost:3001/etiquetas/getId?idEtiqueta=${idEtiqueta}`);
    const etiquetaResSQL = etiquetasRes.data.result;
    if(etiquetaResSQL.length > 0) setNomEtiqueta(etiquetaResSQL[0].nombre)
  };
  
  const eliminarTarea = async ()=>{
    let confirmar = window.confirm("Estas seguro de eliminar esta tarea?");
    if(confirmar === true){
      await axios.delete(`http://localhost:3001/tareas?idTarea=${idTarea}`);
      setActualizarMain(true);
    }
    else return
  }

  const atributos = {
    idTarea: idTarea,
    idUsuario: idUsuario,
    idEtiqueta: idEtiqueta,
    nombre: nombre,
    prioridad: prioridad,
    fecha: fecha,
    descripcion: descripcion
  }
  
/*   useEffect(()=>{
    console.log("A tareas le llego desde main: ", atributos);
  }) */
  
  useEffect(()=>{
    getEtiquetas();
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
