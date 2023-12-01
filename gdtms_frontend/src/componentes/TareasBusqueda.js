import { useEffect, useState } from 'react';
import axios from 'axios';

export function TareasHoy() {

    const [tareas, setTareas] = useState()

    useEffect(() => {
        //Aca deberia mandarle un parametro con la busqueda
        //Y manejar ese parametro desde el BackEnd.
        axios.get("http://localhost:3001/tareas/busqueda")
            .then((busquedaRes) => {
                if (busquedaRes) {
                    const busquedaArray = busquedaRes.data.result;
                    console.log("Se ha recibido respuesta desde el BackEnd & BUSQUEDAARRAY es: ", busquedaArray);
                    formatearFechas(busquedaArray);
                    setTareas(busquedaArray);
                }
                else console.log("No hubo respuesta BUSQUEDA desde el backend");
            })
            .catch((err) => {
                console.log(`tareasBusqueda error: ${err}`);
            })
    }, [])

    return (
        <div className='tareasBusqueda'>
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