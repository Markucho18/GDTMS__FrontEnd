
export function Tarea(props) {
  return (
    <>
      {props.data.map((tarea, i) => {
        return (
          <div key={i} className={`contenedorTarea col cen p${tarea.prioridad}`}>
            <div className="seccionTarea superior row cen">
              <div className="info cen">
                <input type="checkbox" className="estadoTarea" />
                <span className="nombreTarea">{tarea.titulo}</span>
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
                <i className="fa-regular fa-calendar"></i>{tarea.fecha}
              </span>
              <span className="etiqueta">{tarea.etiqueta}</span>
            </div>
            <div className="seccionTarea row">
              <span className="desc">{tarea.descripcion}</span>
            </div>
          </div>
        );
      })}
      <button onClick={() => console.log(props.data)}>Pedir Datos</button>
    </>
  );
}
