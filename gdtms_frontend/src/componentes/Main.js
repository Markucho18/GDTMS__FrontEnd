import { ModalTarea } from "./ModalTarea";
import { Formulario } from "./Formulario";
import { Tarea } from "./Tarea";
import { GestionarEt } from "./GestionarEt";
import { tareas } from "../datosSimulados/tareas";

export function Main(props) {
  return (
    <div className="contenedorMain col">
      <GestionarEt />
      {/* <div className="listaTareas col">
                <Tarea data={tareas}/>
            </div> */}
    </div>
  );
}
