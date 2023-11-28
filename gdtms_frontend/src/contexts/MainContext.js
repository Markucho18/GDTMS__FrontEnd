import { createContext, useEffect, useState} from "react";
import {format} from 'date-fns';

export const MainContext = createContext();

export function MainContextProvider({children}){

    const [tareasConsulta, setTareasConsulta] = useState("inbox");

    const [actualizacion, setActualizacion] = useState(false);

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
            console.log("tareasConsulta es un string");
            //De esto se encarga Main.js usando el operador ternario en el html
            if(tareasConsulta === "proximo" || tareasConsulta === "gestionar") return
            if(tareasConsulta === "inbox") console.log("tareasConsulta: inbox");
            if(tareasConsulta === "hoy") console.log("tareasConsulta: hoy");
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


    return (
        <MainContext.Provider value={{
            tareasConsulta,
            setTareasConsulta,
            actualizacion, 
            setActualizacion, 
            actualizarMain, 
            handleTareasConsulta, 
            formatearFechas,
            actualizarTareas
            }}>
            {children}
        </MainContext.Provider>
    )
}