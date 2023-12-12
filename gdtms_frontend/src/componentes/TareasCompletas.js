import { useContext, useState , useEffect} from "react";
import { Tarea } from "./Tarea";
import { MainContext } from "../contexts/MainContext";
import axios from 'axios';
import { TokenContext } from "../contexts/TokenContext";
import { areIntervalsOverlapping } from "date-fns";

export function TareasCompletas(){

    const {actualizacion, setActualizacion, actualizarTareas, formatearFechas} = useContext(MainContext);

    const [tareas, setTareas] = useState([]);

    const {userId} = useContext(TokenContext);

    const getTareas = ()=>{
        axios.get(`http://localhost:3001/tareas/completas?userId=${userId}`)
        .then((res)=>{
            if (res) {
                const completasArray = res.data.result;
                console.log("Se ha recibido respuesta desde el BackEnd & completasARRAY es: ", completasArray);
                formatearFechas(completasArray);
                const completasOrdenadas = completasArray.sort((a, b) => {
                    const dateA = new Date(a.fecha);
                    const dateB = new Date(b.fecha);
                    return dateA - dateB;
                })
                setTareas(completasOrdenadas);
            }
            else console.log("No hubo respuesta TareasCompletas desde el backend");
        }).catch((err)=> console.log("Ha ocurrido un error en getTareas() (TareasCompletas): ", err))
    }

    //CONTEXTO: ME TIRA ERROR

    const limpiarTareas = ()=>{
        axios.delete(`http://localhost:3001/tareas/completas?userId=${userId}`)
        .then((res)=>{
            if (res) {
                console.log("Backend: ", res.data);
                actualizarTareas();
            }
            else console.log("No hubo respuesta limpiarTareas() desde el backend");
        }).catch((err)=> console.log("Ha ocurrido un error en limpiarTareas(): ", err))
    }

    useEffect(() => {
        console.log("Se ha renderizado <TareasCompletas/>");
        getTareas();
    }, [])

    //Forzar actualizacion del componente:
    useEffect(()=>{
        if(actualizacion === true){
            getTareas();
            setActualizacion(false);
            console.log("Se ha re-renderizado el componente con las tareas actualizadas.")
        }
        else return
    },[actualizacion])

    return (
        <div className='tareasCompletas'>
            <div className='listaTareas col'>
                <div className="row cen">
                    <span className='tareasTotales'>{tareas && tareas.length > 0 ? `Tareas Totales: ${tareas.length}` : "No hay tareas"}</span>
                    <span><i className="fa-solid fa-delete-left flechita" onClick={limpiarTareas}></i></span>
                </div>
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