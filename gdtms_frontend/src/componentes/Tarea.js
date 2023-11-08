
export function Tarea({prioridad, titulo, fecha, etiqueta, descripcion}) {

  return (
    <div className={`contenedorTarea col cen p${prioridad}`}>
      <div className="seccionTarea superior row cen">
        <div className="info cen">
          <input type="checkbox" className="estadoTarea" />
          <span className="nombreTarea">{titulo}</span>
        </div>
        <div className="acciones row">
          <span className="accion">
            <i className="fa-solid fa-pen-to-square"></i>
          </span>
          <span className="accion">
            <i className="fa-solid fa-trash-can"></i>
          </span>
        </div>
      </div>
      <div className="seccionTarea medio row">
        <span className="fecha row">
          <i className="fa-regular fa-calendar"></i>
          {fecha}
        </span>
        <span className="etiqueta">{etiqueta}</span>
      </div>
      <div className="seccionTarea row">
        <span className="desc">{descripcion}</span>
      </div>
    </div>
  );
}
