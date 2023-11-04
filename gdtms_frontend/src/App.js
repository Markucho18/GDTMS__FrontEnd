import { Contexto } from "./Contexto";
import { useContext, useState, useEffect } from "react";
import { Header } from "./componentes/Header";
import { Sidebar } from "./componentes/Sidebar";
import { Main } from "./componentes/Main";
import { ModalTarea } from "./componentes/ModalTarea";

function App() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const handleModalTarea = () => modalAbierto === false ? setModalAbierto(true) : setModalAbierto(false)
  useEffect(() => {
    console.log(modalAbierto);
  }, [modalAbierto]);

  return (
    <div className="App col">
      {modalAbierto === true ? (<ModalTarea cerrarModalTarea={handleModalTarea} />) : null}
      <Header abrirModalTarea={handleModalTarea} />
      <div className="sidebarMain row">
        <Sidebar />
        <Main />
      </div>
    </div>
  );
}

export default App;
