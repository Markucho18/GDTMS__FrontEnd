import { createContext, useEffect, useState} from "react";
import axios from 'axios';
import {format} from 'date-fns';

export const MainContext = createContext();

export function MainContextProvider({children}){

    //A esto solo va acceder Main para renderizar segun que le llegó.
    const [consulta, setConsulta] = useState("inbox");

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
    
    const handleConsulta = async (consulta)=>{
        setTareasMostradas([]);
        if(typeof consulta === 'string'){
            //De esto se encarga Main.js usando el operador ternario en el html
            if( consulta === "proximo" || consulta === "gestionar") return setConsulta(consulta);
            //
            console.log("consulta es un string");
            if(consulta === "inbox"){
                console.log("handleConsulta ha llegado a inbox");
                const inboxRes = await axios.get("http://localhost:3001/tareas/inbox");
                if(inboxRes){
                    const inboxArray = inboxRes.data.result;
                    console.log("Se ha recibido respuesta desde el BackEnd & INBOXARRAY es: ", inboxArray);
                    setTareasMostradas(inboxArray);
                }
                else console.log("No hubo respuesta INBOX desde el backend");
            }
            if(consulta === "hoy"){
                console.log("handleConsulta ha llegado a hoy")
                const hoyRes = await axios.get("http://localhost:3001/tareas/hoy");
                if(hoyRes){
                    const hoyArray = hoyRes.data.result;
                    console.log("Se ha recibido respuesta desde el BackEnd & HOYARRAY es: ", hoyArray);
                    formatearFechas(hoyArray);
                    setTareasMostradas(hoyArray);
                }
                else console.log("No hubo respuesta HOY desde el backend");
            };
        }
        if(typeof consulta === 'object'){
            if(consulta.busqueda) console.log("consulta: {busqueda: x}");
            if(consulta.etiqueta) console.log("consulta: {etiqueta: x}");
        }
        console.log("handleConsulta se ha terminado de ejecutar");
    }

    useEffect(()=>{
        console.log("consulta en MainContext es: ", consulta);
    },[consulta])

    useEffect(()=>{
        if(tareasMostradas.length > 0) console.log("tareasMostradas en MainContext ha cambiado a: ", tareasMostradas);
        else console.log("tareasMostradas en MainContext esta vacio");
    },[tareasMostradas])

    return (
        <MainContext.Provider value={{
            consulta,
            setConsulta,
            actualizacion, 
            setActualizacion, 
            actualizarMain,
            tareasMostradas,
            setTareasMostradas, 
            handleConsulta, 
            formatearFechas
            }}>
            {children}
        </MainContext.Provider>
    )
}