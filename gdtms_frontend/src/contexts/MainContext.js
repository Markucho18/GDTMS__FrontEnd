import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { format } from 'date-fns';

export const MainContext = createContext();

export function MainContextProvider({ children }) {

    //A esto solo va acceder Main para renderizar segun que le llegó.
    const [consulta, setConsulta] = useState({fecha: "inbox"});

    const enviarConsulta = (consulta)=>{
        console.log("Se ha ejecutado enviarConsulta(), consulta: ", consulta);
        setConsulta(consulta);
    }

    const [actualizacion, setActualizacion] = useState(false);

    const actualizarTareas = () => setActualizacion(true);

    //Esta funcion simplemente estiliza las fechas dentro de <Tarea/>
    const formatearFechas = (array) => {
        return array.map((tarea, i) => {
            if(tarea.fecha !== null){
                const fechaBack = new Date(tarea.fecha);
                const fechaVista = format(fechaBack, 'dd/MM/yy');
                const fechaValue = format(fechaBack, 'yyyy-MM-dd')
                tarea.fechaVista = fechaVista;
                tarea.fecha = fechaValue;
                return tarea
            }
            else return tarea
        })
    }

    const [etiquetas, setEtiquetas] = useState([]);

    const getEtiquetas = async () => {
        axios.get("http://localhost:3001/etiquetas")
        .then((etiquetasRes)=>{
            console.log(etiquetasRes.data);
            setEtiquetas(etiquetasRes.data.result)
        } )
        .catch((err)=> console.log("Ha ocurrido un error en getEtiquetas(): ", err))
    };

    useEffect(() => {
        console.log("consulta en MainContext es: ", consulta);
    }, [consulta])

    return (
        <MainContext.Provider value={{
            consulta,
            setConsulta,
            enviarConsulta,
            actualizacion,
            setActualizacion,
            actualizarTareas,
            formatearFechas,
            etiquetas,
            getEtiquetas
        }}>
            {children}
        </MainContext.Provider>
    )
}
