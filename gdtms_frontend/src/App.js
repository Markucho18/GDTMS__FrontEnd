import { Contexto } from "./Contexto";
import { useContext } from "react";
import { Header } from "./componentes/Header";
import { Sidebar } from "./componentes/Sidebar";
import { Main } from "./componentes/Main";
import { ModalTarea } from "./componentes/ModalTarea";

function App() {
  const { mostrarModal } = useContext(Contexto);
  return (
    <div className="App col">
      {mostrarModal === true ? <ModalTarea /> : null}
      <Header />
      {/* <Formulario form="register"/> */}
      <div className="sidebarMain row">
        <Sidebar />
        <Main />
      </div>
    </div>
  );
}

export default App;
