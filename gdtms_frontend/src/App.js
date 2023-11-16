import { Contexto } from "./Contexto";
import { useContext, useState, useEffect } from "react";
import { Login } from './componentes/Login'
import { Register } from './componentes/Register'
import { Header } from "./componentes/Header";
import { Sidebar } from "./componentes/Sidebar";
import { Main } from "./componentes/Main";
import { ModalTarea } from "./componentes/ModalTarea";

function App() {

  const {tokenValido, setTokenValido, verificarToken} = useContext(Contexto);

  const [modalAbierto, setModalAbierto] = useState(false);
  const handleModalTarea = () => modalAbierto === false ? setModalAbierto(true) : setModalAbierto(false)

  const [formulario, setFormulario] = useState("login");
  const handleForm = ()=> formulario === "login" ? setFormulario("register") : setFormulario("login")

  useEffect(()=>{
    verificarToken();
  },[])


  return (
    <div className="App col">
      {tokenValido == false && formulario === "login" ? <Login handleForm={handleForm}/>
      : tokenValido == false && formulario == "register" ? <Register handleForm={handleForm}/> : null  }

      {tokenValido == true ? (
        <>
        <Header abrirModalTarea={handleModalTarea} />
        <div className="sidebarMain row">
          <Sidebar />
          <Main />
        </div>
        </>
        )
        : null
      }

      {modalAbierto === true ? (<ModalTarea cerrarModalTarea={handleModalTarea} />) : null}

    </div>
  );
}

export default App;
