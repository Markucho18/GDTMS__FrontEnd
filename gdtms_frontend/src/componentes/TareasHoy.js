import { useContext, useEffect, useState } from 'react';
import {Tarea} from "./Tarea";
import axios from 'axios';
import { MainContext } from '../contexts/MainContext';
import { TokenContext } from '../contexts/TokenContext';

export function TareasHoy() {

    const {actualizacion, setActualizacion, formatearFechas} = useContext(MainContext);

    const {userId} = useContext(TokenContext);

    const [tareas, setTareas] = useState()
    
    const getTareas = async ()=>{
        axios.get(`http://localhost:3001/tareas/hoy?userId=${userId}`)
            .then((hoyRes) => {
                if (hoyRes) {
                    console.log("hoyRes: ", hoyRes)
                    const hoyArray = hoyRes.data.result;
                    console.log("Se ha recibido respuesta desde el BackEnd & HOYARRAY es: ", hoyArray);
                    formatearFechas(hoyArray);
                    hoyArray.sort((a, b)=> a.prioridad - b.prioridad);
                    setTareas(hoyArray);
                }
                else console.log("No hubo respuesta HOY desde el backend");
            })
            .catch((err) => {
                console.log("tareasHoy error: ", err);
            })
    }

    useEffect(() => {
        console.log("Se ha renderizado <TareasHoy/>");
        getTareas();
    }, [])
    
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
        <div className='tareas'>
            <div className='listaTareas col'>
                <span className='tareasTotales'>{tareas && tareas.length > 0 ? `Tareas Totales: ${tareas.length}` : "No hay tareas"}</span>
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