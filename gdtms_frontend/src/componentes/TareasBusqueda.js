import { useEffect, useState, useContext } from 'react';
import {Tarea} from "./Tarea";
import axios from 'axios';
import { MainContext } from '../contexts/MainContext';
import { TokenContext } from '../contexts/TokenContext';

export function TareasBusqueda({textoBusqueda}) {

    const {actualizacion, setActualizacion, formatearFechas} = useContext(MainContext);

    const {userId} = useContext(TokenContext);

    const [tareas, setTareas] = useState()

    const getTareas = async ()=>{
        console.log("getTareas ha recibido textoBusqueda: ", textoBusqueda)
        axios.post("http://localhost:3001/tareas/buscar", {textoBusqueda, userId})
        .then((busquedaRes) => {
            if (busquedaRes) {
                const busquedaArray = busquedaRes.data.result;
                console.log("Se ha recibido respuesta desde el BackEnd & BUSQUEDAARRAY es: ", busquedaArray);
                formatearFechas(busquedaArray);
                busquedaArray.sort((a, b)=> a.prioridad - b.prioridad);
                setTareas(busquedaArray);
            }
            else console.log("No hubo respuesta BUSQUEDA desde el backend");
        })
        .catch((err) => {
            console.log(`tareasBusqueda error: ${err}`);
        }) 
    }

    useEffect(() => {
        console.log("Se ha renderizado el componente <TareasBusqueda/>");
        getTareas();
    }, [textoBusqueda])

    //Forzar actualizacion del componente
    useEffect(()=>{
        if(actualizacion === true){
            getTareas();
            setActualizacion(false);
            console.log("Se ha re-renderizado el componente con las tareas actualizadas.")
        }
        else return
    },[actualizacion])

    return (
        <div className='tareasBusqueda'>
            <div className='listaTareas col'>
                <span className='tareasTotales'>{tareas && tareas.length > 0 ? `Coincidencias: ${tareas.length}` : "No se encontraron coincidencias"}</span>
                {tareas && tareas.length > 0 ? (
                    tareas.map((tarea, i) => (
                        <Tarea
                            key={i}
                            estadoTarea={tarea.estado}
                            prioridad={tarea.prioridad}
                            nombre={tarea.nombre}
                            fecha={tarea.fecha}
                            fechaVista={tarea.fechaVista}
                            idTarea={tarea.id_tarea}
                            idEtiqueta={tarea.id_etiqueta}
                            descripcion={tarea.descripcion}
                            idUsuario={tarea.id_usuario}
                        />
                    ))) : null
                }
            </div>
        </div>
    )
}