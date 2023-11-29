import axios from 'axios';
import {format} from 'date-fns';
import { es } from 'date-fns/locale';
import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../contexts/MainContext';

export function Proximo(){

    const {formatearFechas} = useContext(MainContext);

    const [tareasMostradas, setTareasMostradas] = useState([]);

    const [fechasUnicas, setFechasUnicas] = useState([]);

    const mostrarTareas = async () =>{
        const proximoRes = await axios.get("http://localhost:3001/tareas/proximo");
        const proximoArray = proximoRes.data.result;
        formatearFechas(proximoArray);
        setTareasMostradas(proximoArray);
        tareasMostradas.map(tarea =>{
            agregarFecha(tarea.fecha);
        })
    }

    const agregarFecha = (fecha)=>{
        console.log("La fecha recibida en agregarFecha es: ", fecha)
        const fechaEstilizada = format(fecha, 'E', {locale: es});
        console.log(fechaEstilizada);
        if(!fechasUnicas.includes(fechaEstilizada)){
            setFechasUnicas([...fechasUnicas, fechaEstilizada]);
        }
    }

    useEffect(()=>{
        console.log("FechasUnicas es: ", fechasUnicas );
    },[fechasUnicas])

    useEffect(()=>{
        mostrarTareas();
    },[])

    return (
        <>
            {tareasMostradas.length > 0 &&
            tareasMostradas.map((tarea, i) =>(
                <span key={i}>{tarea.nombre}</span>
            ))}
            <span>{"<Proximo/>"}</span>
        </>
    )
}