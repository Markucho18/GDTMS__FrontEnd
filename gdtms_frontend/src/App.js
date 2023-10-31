import {Tarea} from './componentes/Tarea';
import {ModalTarea} from './componentes/ModalTarea'
import {Formulario} from './componentes/Formulario'
import {Header} from './componentes/Header'
import { datos } from './datos';


function App() {
  return (
    <div className="App">
      <Header/>
      {/* <Tarea data={datos}/> */}
      <Formulario form="register"/>
      
    </div>
  );
}

export default App;
