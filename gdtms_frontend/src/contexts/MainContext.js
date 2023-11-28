import { createContext, useState} from "react";
import {format} from 'date-fns';

export const MainContext = createContext();

export function MainContextProvider({children}){

    const [tareasConsulta, setTareasConsulta] = useState("inbox");

    const [actualizacion, setActualizacion] = useState(false);

    const actualizarMain = ()=> setActualizacion(true);

    const handleTareasConsulta = async ()=>{
        if(typeof tareasConsulta === 'string'){
            //De esto se encarga Main.js usando el operador ternario en el html
            if(tareasConsulta === "proximo" || tareasConsulta === "gestionar") return
            if(tareasConsulta === "inbox") alert();
            if(tareasConsulta === "hoy") alert();
        }
        if(typeof tareasConsulta === 'object'){
            if(tareasConsulta.busqueda) alert()
            if(tareasConsulta.etiqueta) alert()
        }
    }

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

    return (
        <MainContext.Provider value={{tareasConsulta, setTareasConsulta, actualizacion, setActualizacion, actualizarMain, handleTareasConsulta}}>
            {children}
        </MainContext.Provider>
    )
}