import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

export function TareasProximo(){

    useEffect(()=>{
        axios.get("http://localhost:3001/tareas/proximo")
            .then((proximoRes) => {
                if (proximoRes) {
                    const proximoArray = proximoRes.data.result;
                    console.log("Se ha recibido respuesta desde el BackEnd & PROXIMOARRAY es: ", proximoArray);
                    formatearFechas(proximoArray);
                    setTareas(proximoArray);
                }
                else console.log("No hubo respuesta PROXIMo desde el backend");
            })
            .catch((err) => {
                console.log(`tareasProximo error: ${err}`);
            })
    },[])

    return(
        <div className='tareasProximo'>
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
    )
}