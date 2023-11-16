import { useEffect, useState } from "react";
import axios from "axios";

export function ModalTarea({ cerrarModalTarea }) {
  const [etiquetas, setEtiquetas] = useState();
  const getEtiquetas = async () => {
    const etiquetasRes = await axios.get("http://localhost:3001/etiquetas");
    setEtiquetas(etiquetasRes.data);
  };

  useEffect(() => {
    console.log(etiquetas);
  }, [etiquetas]);

  return (
    <div className="fondoModal cen col">
      <div className="contenedorModal cen col">
        <label className="row">
          Nombre:
          <input type="text" className="modalNombre" />
        </label>
        <label className="row">
          Fecha:
          <input type="date" className="modalFecha" />
        </label>
        <label className="row">
          Prioridad:
          <select>
            <option className="rojo">1</option>
            <option className="naranja">2</option>
            <option className="amarillo">3</option>
            <option className="celeste">4</option>
          </select>
        </label>
        <label className="row">
          Etiqueta:
          <select onClick={getEtiquetas}>
            {etiquetas ? (
              etiquetas.map((etiqueta, i) => (
                <option key={i} className={etiqueta.color}>
                  {etiqueta.nombre}
                </option>
              ))
            ) : (
              <option>...</option>
            )}
            <option>Ninguna</option>
          </select>
        </label>
        <label className="col">
          Descripcion:{" "}
          <textarea className="modalDesc" maxLength={80}></textarea>
        </label>
        <div className="botones row">
          <span className="btn" onClick={cerrarModalTarea}>
            Cancelar
          </span>
          <span className="btn" onClick={cerrarModalTarea}>
            Guardar
          </span>
        </div>
      </div>
    </div>
  );
}
