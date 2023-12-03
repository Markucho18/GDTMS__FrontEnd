import { Tarea } from "./Tarea";
import { useState } from "react";

export function ProximoSeccion (fecha, tareas){

    function obtenerFecha(fecha) {
        const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const dia = diasSemana[new Date(fecha).getDay()];
        const numFecha = new Date(fecha).getDate();
        const meses = ["Enero", "Febrero", "Mayo", "Abril", "Marzo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
        const mes = meses[new Date(fecha).getMonth()];
        return `${dia}, ${numFecha} de ${mes}`;
    }

    const [visible, setVisible] = useState(true)
    const handleVisible = ()=> setVisible(!visible);

    //CONTEXTO: PROXIMOSECCION NO ESTA RECIBIENDO DATOSSECCION.

    //PRTAS PROFE:
        //POR QUE TENGO TANTO LAG?
        //HAY ALGUNA MANERA MEJOR O MAS FACIL DE HACER LO QUE QUIERO HACER?
    return (
        <>
            <span>{`Fecha: ${fecha}`}</span>
            {tareas && tareas.length > 0 ? (
                tareas.map((tarea)=>(
                    <div key={tarea.id_tarea}>
                        <span>{`NombreTarea: ${tarea.nombre}`}</span> 
                        <span>{`FechaTarea: ${tarea.fecha}`}</span> 
                    </div>
                ))
            ): <span>No se recibio tareas</span>}
        </>
    )
}
    {/* {visible === true && (
        <div>
            <div className='desplegable row'>
            <span>{`${obtenerFecha(fecha)}(${tareas.length})`}</span>
            <i className="fa-solid fa-angle-down flechita" onClick={handleVisible}></i>
            </div>
            <div className="listaTareas col">
                {tareas && tareas.length > 0 ? (
                    tareas.map((tarea, i) => (
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
        </div>
    )} */}