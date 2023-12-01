import { useEffect, useState } from 'react';
import {Tarea} from "./Tarea";
import axios from 'axios';

export function TareasInbox() {

    const [tareas, setTareas] = useState()

    useEffect(() => {
        console.log("Se ha renderizado <Inbox/>")
        axios.get("http://localhost:3001/tareas/inbox")
            .then((inboxRes) => {
                console.log("inboxRes: ", inboxRes);
                if (inboxRes) {
                    const inboxArray = inboxRes.data.result;
                    console.log("Se ha recibido respuesta desde el BackEnd & INBOXARRAY es: ", inboxArray);
                    if (inboxArray !== undefined) setTareas(inboxArray);
                }
                else console.log("No hubo respuesta INBOX desde el backend");
            }) .catch((err) => console.log(`inboxRes error: ${err}`) )
    }, [])

    return (
        <div className='tareasInbox'>
            <span>Este es el componente Inbox</span>
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