import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { MainContext } from '../contexts/MainContext';

export function TareasHoy() {

    const {consulta} = useContext(MainContext);

    const [tareas, setTareas] = useState()

    useEffect(() => {
        // Aca deberia mandarle un query con el nombre de la etiqueta
        // Desde el back, con esa query obtener el id
        // Mandar el id por query y obtener las tareas
        axios.get(`http://localhost:3001/etiquetas/getNombre?nomEtiqueta=${consulta.etiqueta}`)
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