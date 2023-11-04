import { etiquetas } from "../datosSimulados/etiquetas";

export function ModalTarea({cerrarModalTarea}) {
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
                <option className='rojo'>1</option>
                <option className='naranja'>2</option>
                <option className='amarillo'>3</option>
                <option className='celeste'>4</option>
            </select>
        </label>
        <label className="row">
          Etiqueta:
          <select>
            {etiquetas.map((etiqueta, i) => (
              <option key={i} className={etiqueta.color}>
                {etiqueta.nombre}
              </option>
            ))}
            <option>Ninguna</option>
          </select>
        </label>
        <label className="col">
          Descripcion:{" "}
          <textarea className="modalDesc" maxLength={150}></textarea>
        </label>
        <span className="btn" onClick={cerrarModalTarea}>Guardar</span>
      </div>
    </div>
  );
}
