import {Tarea} from './componentes/Tarea';
import {ModalTarea} from './componentes/ModalTarea'
import {Formulario} from './componentes/Formulario'
import { datos } from './datos';


function App() {
  return (
    <div className="App">
      {/* <Tarea data={datos}/> */}
      <Formulario/>
    </div>
  );
}

export default App;
