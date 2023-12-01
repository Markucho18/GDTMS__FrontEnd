import { useEffect, useState } from 'react';
import axios from 'axios';

export function TareasHoy() {

    const [tareas, setTareas] = useState()

    useEffect(() => {
        axios.get("http://localhost:3001/tareas/hoy")
            .then((hoyRes) => {
                if (hoyRes) {
                    const hoyArray = hoyRes.data.result;
                    console.log("Se ha recibido respuesta desde el BackEnd & HOYARRAY es: ", hoyArray);
                    formatearFechas(hoyArray);
                    setTareas(hoyArray);
                }
                else console.log("No hubo respuesta HOY desde el backend");
            })
            .catch((err) => {
                console.log(`tareasHoy error: ${err}`);
            })
    }, [])

    return (
        <div className='tareasHoy'>
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