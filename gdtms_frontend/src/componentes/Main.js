import {ModalTarea} from './ModalTarea'
import {Formulario} from './Formulario'
import { Tarea } from './Tarea'
import { datos } from '../datos';

export function Main(props){
    return(
        <div className="contenedorMain col" >
            <div className="listaTareas col">
                <Tarea data={datos}/>
            </div>
        </div>
    )
}