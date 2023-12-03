import { createContext, useEffect, useState } from "react";
import { format } from 'date-fns';

export const MainContext = createContext();

export function MainContextProvider({ children }) {

    //A esto solo va acceder Main para renderizar segun que le llegó.
    const [consulta, setConsulta] = useState({fecha: "inbox"});

    const enviarConsulta = (consulta)=> setConsulta(consulta);

    const [actualizacion, setActualizacion] = useState(false);

    const actualizarTareas = () => setActualizacion(true);

    //Esta funcion simplemente estiliza las fechas dentro de <Tarea/>
    const formatearFechas = (array) => {
        return array.map((tarea, i) => {
            const fechaBack = new Date(tarea.fecha);
            const fechaVista = format(fechaBack, 'dd/MM/yy');
            const fechaValue = format(fechaBack, 'yyyy-MM-dd')
            tarea.fechaVista = fechaVista;
            tarea.fecha = fechaValue;
            return tarea
        })
    }

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
            formatearFechas
        }}>
            {children}
        </MainContext.Provider>
    )
}
