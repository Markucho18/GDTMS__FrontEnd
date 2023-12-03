import { useContext, useEffect, useState } from 'react';
import { ProximoSeccion } from './ProximoSeccion';
import {Tarea} from "./Tarea";
import { MainContext } from '../contexts/MainContext';
import axios from 'axios';
import { format } from 'date-fns';

export function TareasProximo(){

    const [tareas, setTareas] = useState([])

    const [fechasUnicas, setFechasUnicas] = useState([]);

    const [datosSeccion, setDatosSeccion] = useState([]);

    const {actualizacion, setActualizacion, formatearFechas} = useContext(MainContext);

    const getFechasUnicas = ()=>{
        return axios.get("http://localhost:3001/tareas/fechasUnicas")
        .then((fechasRes)=>{
            const fechasUnicasArray = fechasRes.data.result.map((tarea)=>{
                return format(new Date(tarea.fecha), 'yyyy-MM-dd');
            })
            console.log("Se obtuvo datos desde getFechasUnicas(): ", fechasUnicasArray);
            setFechasUnicas(fechasUnicasArray);
        }).catch((err)=> console.log("getFechasUnicas error: ", err))
    }

    const filtrarTareas = async ()=>{
        //Obtiene las proximas tareas
        axios.get("http://localhost:3001/tareas/proximo")
            .then((proximoRes) => {
                if (proximoRes) {
                    const proximoArray = proximoRes.data.result;
                    console.log("Se ha recibido respuesta desde el BackEnd & PROXIMOARRAY es: ", proximoArray);
                    const tareas = formatearFechas(proximoArray);
                    setTareas(tareas);
                    //Devuelve un objeto con la fecha y tareas correspondientes (que se pone en datosSeccion)
                    if(fechasUnicas.length > 0 ){
                        const resultado = fechasUnicas.map(fecha => {
                            // Filtra las tareas que tienen la fecha actual
                            const tareasFiltradas = tareas.filter(tarea => tarea.fecha === fecha);
                            // Retorna un objeto con la fecha y las tareas correspondientes
                            return { fecha, tareas: tareasFiltradas };
                        });
                        setDatosSeccion(resultado);
                    }
                    else console.log("filtrarTareas() no ha recibido fechasUnicas ", {fechasUnicas})
                }
                else console.log("No hubo respuesta PROXIMO desde el backend");
            }).catch((err) => console.log(`tareasProximo error: ${err}`))
    }


    useEffect(()=>{
        console.log("Se ha renderizado <TareasProximo/>");
        getFechasUnicas();
    },[])

    useEffect(()=>{
        filtrarTareas();
    },[fechasUnicas])

    useEffect(()=>{
        console.log("datosSeccion: ", datosSeccion)
    })

    //Forzar actualizacion del componente
    useEffect(()=>{
        if(actualizacion === true){
            getFechasUnicas();
            filtrarTareas();
            setActualizacion(false);
            console.log("Se ha re-renderizado el componente con las tareas actualizadas.")
        }
        else return
    },[actualizacion])

    return(
        <div className='tareasProximo'>
            <span>Este es el componente TareasProximo</span><br/>
            {datosSeccion && datosSeccion.length > 0 ? (
                datosSeccion.map((dato)=>(
                    <ProximoSeccion fecha={dato.fecha} tareas={dato.tareas}/>
                ))
            ): <p>Cargando...</p>}
            {/* {tareas && tareas.length > 0 ? (
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
            } */}
        </div>
    )
}