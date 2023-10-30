import {Tarea} from './componentes/Tarea';
import { datos } from './datos';


function App() {
  return (
    <div className="App">
      <Tarea data={datos}/>
      {datos.map((tarea, i)=>{
        return <h1 key={i}>{tarea.title}</h1>
      })}
    </div>
  );
}

export default App;
