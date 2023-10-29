import "../estilos/tarea.css";

export function Tarea(props) {
  return (
    <div className="contenedorTarea col cen">
      <div className="seccionTarea superior row cen">
        <div className="info cen">
          <input type="checkbox" className="estadoTarea" />
          <span className="nombreTarea">Pasear al perro</span>
        </div>
        <div className="acciones row">
            <span className="accion"><i class="fa-solid fa-pen-to-square"></i></span>
            <span className="accion"><i class="fa-solid fa-trash-can"></i></span>
        </div>
      </div>
      <div className="seccionTarea medio row">
        <span className="fecha row"><i class="fa-regular fa-calendar"></i>28/10/23</span>
        <span className="etiqueta">Etiqueta x</span>
      </div>
      <div className="seccionTarea row"> <span className="desc" > Esta tarea consiste en salira dar un paseo con el susodicho animal canino</span></div>
    </div>
  );
}
