import { createContext, useEffect, useState } from "react";
import { format } from 'date-fns';

export const MainContext = createContext();

export function MainContextProvider({ children }) {

    //A esto solo va acceder Main para renderizar segun que le llegó.
    const [consulta, setConsulta] = useState("inbox");

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

    //CONTEXTO, SEGUN SHAGGY:
    //EL USUARIO NO PUEDE CREAR ETIQUETAS SOLO ACCEDER A ELLAS.

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

/* const handleConsulta = async (consulta) => {
    console.log("Segun handleConsulta la consulta recibida en la funcion es: ", consulta)
    setTareasMostradas([]);
    if (typeof consulta === 'string') {
        //De esto se encarga Main.js usando el operador ternario en el html
        if (consulta === "proximo" || consulta === "gestionar") return setConsulta(consulta);
        else setConsulta("");
        //
        console.log("La consulta recibida en handleConsulta es un string");
        if (consulta === "inbox") {
            console.log("handleConsulta ha llegado a inbox");
            axios.get("http://localhost:3001/tareas/inbox")
                .then((inboxRes) => {
                    console.log(inboxRes)
                    if (inboxRes) {
                        const inboxArray = inboxRes.data.result;
                        console.log("Se ha recibido respuesta desde el BackEnd & INBOXARRAY es: ", inboxArray);
                        if (inboxArray !== undefined) setTareasMostradas(inboxArray);
                    }
                    else console.log("No hubo respuesta INBOX desde el backend");
                })
                .catch((err) => {
                    console.log(`error: ${err}`);
                })
        }
        if (consulta === "hoy") {
            console.log("handleConsulta ha llegado a hoy");
            axios.get("http://localhost:3001/tareas/hoy")
                .then((hoyRes) => {
                    if (hoyRes) {
                        const hoyArray = hoyRes.data.result;
                        console.log("Se ha recibido respuesta desde el BackEnd & HOYARRAY es: ", hoyArray);
                        formatearFechas(hoyArray);
                        setTareasMostradas(hoyArray);
                    }
                    else console.log("No hubo respuesta HOY desde el backend");
                })
                .catch((err) => {
                    console.log(`error: ${err}`);
                })
        };
        console.log("handleConsulta se ha terminado de ejecutar");
    } else if (typeof consulta === 'object') {
        console.log("La consulta recibidad en handleConsulta es un objeto");
        if (consulta.busqueda) console.log("consulta: {busqueda: x}");
        if (consulta.etiqueta) console.log("consulta: {etiqueta: x}");
        console.log("handleConsulta se ha terminado de ejecutar");
    }
} */