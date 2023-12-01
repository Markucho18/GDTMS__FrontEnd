import { useContext, useEffect, useState } from 'react';
import {Tarea} from "./Tarea";
import { MainContext } from '../contexts/MainContext';
import axios from 'axios';

export function TareasEtiqueta({etiqueta}) {

  const {formatearFechas} = useContext(MainContext);

    const [tareas, setTareas] = useState()

    useEffect(() => {
        console.log("Se ha renderizado <TareasEtiqueta/>");
        axios.get(`http://localhost:3001/etiquetas/getNombre?nomEtiqueta=${etiqueta}`)
          .then((nomEtiquetaRes) => {
            const idEtiqueta = nomEtiquetaRes.data.result[0];
            axios.get(`http://localhost:3001/tareas/etiqueta?idEtiqueta=${idEtiqueta}`)
              .then((etiquetaRes) => {
                if (etiquetaRes) {
                  const etiquetaArray = etiquetaRes.data.result;
                  console.log("Se ha recibido respuesta desde el BackEnd & etiquetaARRAY es: ", etiquetaArray);
                  formatearFechas(etiquetaArray);
                  setTareas(etiquetaArray);
                } else {
                  console.log("No hubo respuesta etiqueta desde el backend");
                }
              })
              .catch((err) => {
                console.log(`getIdEtiqueta error: ${err}`);
              });
          })
          .catch((err) => {
            console.log(`getNombreEtiqueta error: ${err}`);
          });
      }, []);
      

    return (
        <div className='tareasEtiqueta'>
          <span>Este es el componente TareasEtiqueta y se ha obtenido: {etiqueta}</span>
            {tareas && tareas.length > 0 ? (
                tareas.map((tarea, i) => (
                    <Tarea
                        key={i}
                        estado={tarea.estado}
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
    )
}