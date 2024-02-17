import { useContext, useEffect, useState } from "react";
import { Tarea } from "./Tarea";
import { MainContext } from "../contexts/MainContext";
import axios from "axios";
import { TokenContext } from "../contexts/TokenContext";
import { useEtiqueta } from "../hooks/useEtiqueta";

export function TareasEtiqueta({ etiqueta }) {
  const { actualizacion, setActualizacion, formatearFechas } =
    useContext(MainContext);

  const [tareas, setTareas] = useState();

  const { userId } = useContext(TokenContext);

  const { getIdEtiqueta } = useEtiqueta();

  const getTareas = async () => {
    //Obtengo el ID de la etiqueta mediante el nombre
    const idEtiqueta = getIdEtiqueta(etiqueta);
    //Obtener las tareas mediante el ID
    axios
      .get(
        `http://localhost:3001/tareas/etiqueta?idEtiqueta=${idEtiqueta}&userId=${userId}`
      )
      .then((etiquetaRes) => {
        if (etiquetaRes) {
          const etiquetaArray = etiquetaRes.data.result;
          formatearFechas(etiquetaArray);
          etiquetaArray.sort((a, b) => a.prioridad - b.prioridad);
          setTareas(etiquetaArray);
        } else {
          console.log("No hubo respuesta etiqueta desde el backend");
        }
      })
      .catch((err) => {
        console.log(`getTareas x idEtiqueta error: ${err}`);
      });
  };

  useEffect(() => {
    console.log("Se ha renderizado <TareasEtiqueta/>");
    getTareas();
  }, [etiqueta]);

  //Forzar actualizacion del componente
  useEffect(() => {
    if (actualizacion === true) {
      getTareas();
      setActualizacion(false);
      console.log(
        "Se ha re-renderizado el componente con las tareas actualizadas."
      );
    } else return;
  }, [actualizacion]);

  return (
    <ul className="listaTareas col">
      <p className="p-3 text-xl text-black">
        {tareas && tareas.length > 0
          ? `Tareas Totales: ${tareas.length}`
          : "No hay tareas"}
      </p>
      {tareas && tareas.length > 0 && (
        tareas.map((tarea, i) => (
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
        ))
      )}
    </ul>
  );
}
