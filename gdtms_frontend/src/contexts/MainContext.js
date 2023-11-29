import { createContext, useEffect, useState} from "react";
import axios from 'axios';
import {format} from 'date-fns';

export const MainContext = createContext();

export function MainContextProvider({children}){

    const [tareasConsulta, setTareasConsulta] = useState("inbox");

    const [actualizacion, setActualizacion] = useState(false);

    const [tareasMostradas, setTareasMostradas] = useState([]);

    const actualizarMain = ()=> setActualizacion(true);

    //Esta funcion simplemente estiliza las fechas dentro de <Tarea/>
    const formatearFechas = (array) =>{
        return array.map((tarea, i)=>{
          const fechaBack = new Date(tarea.fecha);
          const fechaVista = format(fechaBack, 'dd/MM/yy');
          const fechaValue = format(fechaBack, 'yyyy-MM-dd')
          tarea.fechaVista = fechaVista;
          tarea.fecha = fechaValue;
          return tarea
        })
      }
    
    const handleTareasConsulta = async ()=>{
        if(typeof tareasConsulta === 'string'){
            if(tareasConsulta === "proximo" || tareasConsulta === "gestionar") return
            console.log("tareasConsulta es un string");
            //De esto se encarga Main.js usando el operador ternario en el html
            if(tareasConsulta === "inbox"){
                console.log("tareasConsulta: inbox");
                const inboxRes = await axios.get("http://localhost:3001/tareas/inbox");
                const inboxArray = inboxRes.data.result;
                setTareasMostradas(inboxArray);
            }
            if(tareasConsulta === "hoy"){
                const hoyRes = await axios.get("http://localhost:3001/tareas/hoy");
                const hoyArray = hoyRes.data.result;
                console.log("El array de las tareas de hoy: ", hoyArray);
                formatearFechas(hoyArray);
                setTareasMostradas(hoyArray);
            };
        }
        if(typeof tareasConsulta === 'object'){
            if(tareasConsulta.busqueda) console.log("tareasConsulta: {busqueda: x}");
            if(tareasConsulta.etiqueta) console.log("tareasConsulta: {etiqueta: x}")
        }
    }

    const actualizarTareas = (dato)=>{
        setTareasConsulta(dato);
        actualizarMain();
    }

    useEffect(()=>{
        console.log("tareasConsulta: ", tareasConsulta);
    },[tareasConsulta])

    useEffect(()=>{
        console.log("tareasMostradas en MainContext es: ", tareasMostradas);
    },[tareasMostradas])

    return (
        <MainContext.Provider value={{
            tareasConsulta,
            setTareasConsulta,
            actualizacion, 
            setActualizacion, 
            actualizarMain,
            tareasMostradas,
            setTareasMostradas, 
            handleTareasConsulta, 
            formatearFechas,
            actualizarTareas
            }}>
            {children}
        </MainContext.Provider>
    )
}