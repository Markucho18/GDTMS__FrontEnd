import {Contexto} from '../Contexto';
import { useState, useEffect, useContext } from "react";
import axios from 'axios';

export function Tarea({estado, prioridad, nombre, fecha, idTarea, idEtiqueta, descripcion}) {

  const {actualizarMain, setActualizarMain, modalAbierto, setModalAbierto, handleModalTarea} = useContext(Contexto);

  const [nomEtiqueta, setNomEtiqueta] = useState("");
  const getEtiquetas = async () => {
    const etiquetasRes = await axios.get(`http://localhost:3001/etiquetas?idEtiqueta=${idEtiqueta}`);
    const etiquetaResSQL = etiquetasRes.data.result;
    if(etiquetaResSQL.length > 0) setNomEtiqueta(etiquetaResSQL[0].nombre)
  };
  
  const eliminarTarea = async ()=>{
    let confirmar = window.confirm("Estas seguro de eliminar esta tarea?");
    if(confirmar == true){
      const eliminarRes = await axios.delete(`http://localhost:3001/tareas?idTarea=${idTarea}`);
      setActualizarMain(true);
    }
    else return
  }
  
  const datosTarea = {
    idTarea,
    nombre,
    prioridad,
    fecha,
    descripcion,
    idEtiqueta
  }
  
  useEffect(()=>{
    getEtiquetas();
  },[])

  return (
    <div className={`contenedorTarea col cen p${prioridad}`}>
      <div className="seccionTarea superior row cen">
        <div className="info cen">
          <input type="checkbox" className="estadoTarea" />
          <span className="nombreTarea">{nombre}</span>
        </div>
        <div className="acciones row" onClick={()=> handleModalTarea("editar")}>
          <span className="accion">
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
          {fecha == null ? "Sin Fecha" : fecha}
        </span>
        <span className="etiqueta">{nomEtiqueta.length > 0 ? nomEtiqueta : "Sin Etiqueta"}</span>
      </div>
      <div className="seccionTarea row">
        <span className="desc">{descripcion == null ? "No hay descripcion..." : descripcion}</span>
      </div>
    </div>
  );
}
