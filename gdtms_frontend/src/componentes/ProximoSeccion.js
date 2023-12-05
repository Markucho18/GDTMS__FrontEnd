import { useEffect, useState } from "react";
import { Tarea } from "./Tarea";
import { useVisible } from "../hooks/useVisible";

export function ProximoSeccion ({dato}){

    function obtenerFecha(fecha) {
        const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const dia = diasSemana[new Date(fecha).getDay()];
        const numFecha = new Date(fecha).getDate() + 1;
        const meses = ["Enero", "Febrero", "Mayo", "Abril", "Marzo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
        const mes = meses[new Date(fecha).getMonth()];
        const anio = new Date(fecha).getFullYear();
        return `${dia}, ${numFecha} de ${mes} de ${anio}`;
    }

    const {visible, handleVisible} = useVisible(false);

    return (
        <>
            <div>
                {dato.fecha && dato.fecha.length > 0 ? (
                    <div className='desplegable row'>
                    <span>{`(${dato.tareas.length}) ${obtenerFecha(dato.fecha)}`}</span>
                    <i className="fa-solid fa-angle-down flechita" onClick={handleVisible}></i>
                    </div>
                ) : <p>No se recibio fecha xd</p>}
                {visible === true && (
                    <div className="listaTareas col">
                        {dato.tareas && dato.tareas.length > 0 ? (
                            dato.tareas.map((tarea, i) => (
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
                    </div>
                )}
            </div>
        </>
    )   
}
    