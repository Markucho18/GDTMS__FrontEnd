import { useContext, useEffect, useState } from 'react';
import {Tarea} from "./Tarea";
import axios from 'axios';
import { MainContext } from '../contexts/MainContext';

export function TareasInbox() {

    const {actualizacion, setActualizacion, formatearFechas } = useContext(MainContext);

    const [tareasSinFecha, setTareasSinFecha] = useState([])

    const [tareasCaducadas, setTareasCaducadas] = useState([])

    const getTareas = async ()=>{
        await getTareasSinFecha();
        await getTareasCaducadas();
    }

    const getTareasSinFecha = async ()=>{
        axios.get("http://localhost:3001/tareas/sinFecha")
            .then((sinFechaRes) => {
                console.log("sinFechaRes: ", sinFechaRes);
                if (sinFechaRes) {
                    const sinFechaArray = sinFechaRes.data.result;
                    console.log("Se ha recibido respuesta desde el BackEnd & sinFechaARRAY es: ", sinFechaArray);
                    if (sinFechaArray !== undefined){
                        sinFechaArray.sort((a, b)=> a.prioridad - b.prioridad);
                        setTareasSinFecha(sinFechaArray);
                    }
                }
                else console.log("No hubo respuesta sinFecha desde el backend");
            }) .catch((err) => console.log(`sinFechaRes error: ${err}`) )
    }

    const getTareasCaducadas = async ()=>{
        axios.get("http://localhost:3001/tareas/caducadas")
            .then((caducadasRes)=>{
                console.log("caducadasRes: ", caducadasRes);
                if(caducadasRes){
                    const caducadasArray = caducadasRes.data.result;
                    console.log("Se ha recibido respuesta desde el BackEnd & CADUCADASARRAY es: ", caducadasArray);
                    if(caducadasArray !== undefined){
                        formatearFechas(caducadasArray);
                        caducadasArray.sort((a, b)=> a.prioridad - b.prioridad);
                        setTareasCaducadas(caducadasArray);
                    }
                }
                else console.log("No hubo respuesta CADUCADAS desde el backend")
            }).catch((err)=> console.log("caducadasRes error: ", err))
    }
    
    useEffect(() => {
        console.log("Se ha renderizado <Inbox/>");
        getTareas()
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

    //Mostrar o ocultar
    
    const [sinFecha, setSinFecha] = useState(false)
    const [caducadas, setCaducadas] = useState(false)
    const handleSinFecha = ()=> setSinFecha(!sinFecha);
    const handleCaducadas = ()=> setCaducadas(!caducadas);

    return (
        <div className='tareasInbox'>
            <div className='desplegable row'>
                <span>{`Tareas sin fecha(${tareasSinFecha.length}):`}</span>
                <i className="fa-solid fa-angle-down flechita" onClick={handleSinFecha}></i>
            </div>
            <div className='listaTareas col'>
                {sinFecha === true &&
                    (tareasSinFecha && tareasSinFecha.length > 0 ? (
                        tareasSinFecha.map((tarea, i) => (
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
                    ))) : <p>No hay tareas...</p>)            
                }
            </div>
            <div className='desplegable row'>
                <span>{`Tareas caducadas(${tareasCaducadas.length}):`}</span>
                <i className="fa-solid fa-angle-down flechita" onClick={handleCaducadas}></i>
            </div>
            <div className='listaTareas col'>
                {caducadas === true &&
                    (tareasCaducadas && tareasCaducadas.length > 0 ? (
                        tareasCaducadas.map((tarea, i) => (
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
                    ))) : <p>No hay tareas...</p>)            
                }
            </div>

        </div>
    )
}