import {ModalTarea} from './ModalTarea'
import {Formulario} from './Formulario'
import { Tarea } from './Tarea'
import { tareas } from '../datosSimulados/tareas';

export function Main(props){
    return(
        <div className="contenedorMain col" >
            <div className="listaTareas col">
                <Tarea data={tareas}/>
            </div>
        </div>
    )
}