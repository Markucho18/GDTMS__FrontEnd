import { useEffect, useState } from "react";
import { Tarea } from "./Tarea";
import { useVisible } from "../hooks/useVisible";

export function ProximoSeccion ({dato}){

    //Devuelve un string de la fecha que mostrara la interfaz en base a la fecha recibida.
    function obtenerFecha(fecha) {
        const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const dia = diasSemana[new Date(fecha).getDay()];
        const numFecha = new Date(fecha).getDate() + 1;
        const meses = ["Enero", "Febrero", "Mayo", "Abril", "Marzo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
        const mes = meses[new Date(fecha).getMonth()];
        const anio = new Date(fecha).getFullYear();
        return `${dia}, ${numFecha} de ${mes} de ${anio}`;
        //Ejemplo: Martes, 19 de Diciembre de 2023
    }

    //Un custom hook que permite que cada seccion maneje su propia variable para mostrar/ocultar.
    //Si cada ProximoSeccion renderizado usara una variable propia del componente se alterarian entre si, o eso me pasó.
    const {visible, handleVisible} = useVisible(false);

    //Ordena las fechas al renderizar
    const [tareasOrdenadas, setTareasOrdenadas] = useState([]);
    useEffect(()=>{
        setTareasOrdenadas(dato.tareas.sort((a, b)=> a.prioridad - b.prioridad));
    },[dato.tareas])

    useEffect(()=>{
        console.log("Se ha renderizado ProximoSeccion");
    },[])

    return (
        <>
            <div>
                {dato.fecha && dato.fecha.length > 0 ? (
                    <div className='desplegable row'>
                        <span>{`(${dato.tareas.length}) ${obtenerFecha(dato.fecha)}`}</span>
                        <i className="fa-solid fa-angle-down flechita" onClick={handleVisible}></i>
                    </div>
                ) : <p>No se recibio fecha</p>}
                {visible === true && (
                    <div className="listaTareas listaProximo col">
                        {tareasOrdenadas && tareasOrdenadas.length > 0 ? (
                            tareasOrdenadas.map((tarea, i) => (
                                <Tarea
                                    key={i}
                                    estadoTarea={tarea.estado}
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
                        }
                    </div>
                )}
            </div>
        </>
    )   
}
    