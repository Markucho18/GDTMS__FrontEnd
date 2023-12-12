import { useContext, useEffect, useState } from 'react';
import { ProximoSeccion } from './ProximoSeccion';
import {Tarea} from "./Tarea";
import { MainContext } from '../contexts/MainContext';
import axios from 'axios';
import { format } from 'date-fns';
import { TokenContext } from '../contexts/TokenContext';

export function TareasProximo(){

    const [fechasUnicas, setFechasUnicas] = useState([]);

    const [datosFecha, setDatosFecha] = useState([]);

    const [datosSeccion, setDatosSeccion] = useState([]);

    const {actualizacion, setActualizacion, formatearFechas} = useContext(MainContext);

    const {userId} = useContext(TokenContext);

    const getFechasUnicas = ()=>{
        return axios.get(`http://localhost:3001/tareas/fechasUnicas?userId=${userId}`)
        .then((fechasRes)=>{
            //Ordena las fechas cronologicamente
            const fechasOrdenadas = fechasRes.data.result.sort((a, b) => {
                const dateA = new Date(a.fecha);
                const dateB = new Date(b.fecha);
                return dateA - dateB;
            });
            //Cambia el formato para poder compararlas con las fechas de las tareas
            const fechasFormateadas = fechasOrdenadas.map((fecha)=>{
                return format(new Date(fecha.fecha), 'yyyy-MM-dd');
            })
            setFechasUnicas(fechasFormateadas);
        }).catch((err)=> console.log("getFechasUnicas error: ", err))
    }

    const filtrarTareas = async ()=>{
        //Obtiene las proximas tareas
        axios.get(`http://localhost:3001/tareas/proximo?userId=${userId}`)
            .then((proximoRes) => {
                if (proximoRes) {
                    const proximoArray = proximoRes.data.result;
                    console.log("Se ha recibido respuesta desde el BackEnd & PROXIMOARRAY es: ", proximoArray);
                    const tareas = formatearFechas(proximoArray);
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

    const [fecha, setFecha] = useState("");
    const handleInputChange = (e)=>{
        const {value} = e.target;
        setFecha(value);
    }

    const tareasPorFecha = async (fecha)=>{
        if(datosSeccion && datosSeccion.length > 0){
            const tareasDeLaFecha = datosSeccion.filter((dato)=> dato.fecha === fecha);
            console.log("tareasDeLaFecha: ", tareasDeLaFecha)
            setDatosFecha(tareasDeLaFecha);
        }
        else console.log("datosSeccion no existe o esta vacio")
    }

    useEffect(()=>{
        console.log("Se ha renderizado <TareasProximo/>");
        getFechasUnicas();
    },[])

    useEffect(()=>{
        filtrarTareas();
    },[fechasUnicas])

    //Forzar actualizacion del componente
    useEffect((e)=>{
        if(actualizacion === true){
            getFechasUnicas();
            setActualizacion(false);
            console.log("Se ha re-renderizado el componente con las tareas actualizadas.")
        }
        else return
    },[actualizacion])

    return(
        <div className='tareasProximo'>
            <input type="date" value={fecha} onChange={handleInputChange}/>
            <button onClick={()=> tareasPorFecha(fecha)}>Buscar Tareas</button>
            <button onClick={()=> setDatosFecha([])}>X</button>
            {datosFecha && datosFecha.length > 0 ? (
                datosFecha.map((dato)=>(
                    <ProximoSeccion dato={dato} />
                ))
            ): (datosSeccion && datosSeccion.length > 0 ? (
                datosSeccion.map((dato)=>(
                    <ProximoSeccion dato={dato} />
                ))
            ): <p className='tareasTotales'>No tienes tareas</p>) }
        </div>
    )
}