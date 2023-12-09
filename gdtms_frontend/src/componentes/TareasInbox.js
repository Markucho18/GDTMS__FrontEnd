import { useContext, useEffect, useState } from 'react';
import {Tarea} from "./Tarea";
import axios from 'axios';
import { MainContext } from '../contexts/MainContext';

export function TareasInbox() {

    const {actualizacion, setActualizacion, formatearFechas, actualizarTareas } = useContext(MainContext);

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

    const limpiarTareas = (tipo)=>{
        let confirmar = window.confirm(`Estas seguro de limpiar las tareas ${tipo && tipo}?`);
        if(confirmar === true){
            if(tipo == "sinFecha"){
                axios.delete("http://localhost:3001/tareas/sinFecha")
                .then((res)=> console.log("Se han eliminado correctamente las tareas sin fecha", res))
                .catch((err)=> console.log("Ha occurido un error al eliminar las tareas sin fecha", err))
                actualizarTareas();
            }
            else if(tipo == "caducadas"){
                axios.delete("http://localhost:3001/tareas/caducadas")
                .then((res)=> console.log("Se han eliminado correctamente las tareas caducadas", res))
                .catch((err)=> console.log("Ha occurido un error al eliminar las tareas caducadas", err))
                actualizarTareas();
            }
            else console.log("limpiarTareas() no ha recibido ningun tipo", {tipo: tipo})
        }
        else return
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
                <div className='acciones row'>
                    <i className="fa-solid fa-delete-left flechita" onClick={()=> limpiarTareas("sinFecha")}></i>
                    <i className="fa-solid fa-angle-down flechita" onClick={handleSinFecha}></i>
                </div>
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
                <div className='acciones row'>
                    <i className="fa-solid fa-delete-left flechita" onClick={()=> limpiarTareas("caducadas")}></i>
                    <i className="fa-solid fa-angle-down flechita" onClick={handleCaducadas}></i>
                </div>
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