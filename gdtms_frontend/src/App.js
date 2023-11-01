import {Header} from './componentes/Header'
import { Sidebar } from './componentes/Sidebar'
import { Main } from './componentes/Main'


function App() {
  return (
    <div className="App col">
      <Header/>
      {/* <Formulario form="register"/> */}
      <div className="sidebarMain row">
        <Sidebar/>
        <Main/>
      </div>
    </div>
  );
}

export default App;
