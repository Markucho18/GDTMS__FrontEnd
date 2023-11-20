import { Contexto } from "./Contexto";
import { useContext, useState, useEffect } from "react";
import { Login } from './componentes/Login'
import { Register } from './componentes/Register'
import { Header } from "./componentes/Header";
import { Sidebar } from "./componentes/Sidebar";
import { Main } from "./componentes/Main";
import { ModalTarea } from "./componentes/ModalTarea";

function App() {

  const {tokenValido, modalAbierto, handleModalTarea} = useContext(Contexto);

  const [formulario, setFormulario] = useState("login");
  const handleForm = ()=> formulario === "login" ? setFormulario("register") : setFormulario("login")

  useEffect(()=>{
    console.log("Modal abierto es: ", modalAbierto);
  },[modalAbierto]);

  useEffect(()=>{
    console.log("El valor de formulario es:", formulario);
    console.log("El valor  de Token Valido es: ", tokenValido);
  }, [formulario]);

  return (
    <div className="App col">
      {tokenValido === false && formulario === "login" ? <Login handleForm={handleForm}/>
      : tokenValido === false && formulario === "register" ? <Register handleForm={handleForm}/> : null  }

      {tokenValido === true ? (
        <>
        <Header/>
        <div className="sidebarMain row">
          <Sidebar />
          <Main />
        </div>
        </>
        )
        : null
      }
      {typeof modalAbierto === 'string' ? 
      modalAbierto === "editar" ?
      <ModalTarea cerrarModalTarea={handleModalTarea} accion="editar"/>
      : <ModalTarea cerrarModalTarea={handleModalTarea} accion="crear"/> 
      : null}

      {/* Y AHORA COMO CORNO RECIBE LOS DATOS DE LA TAREA EL MODAL ??? , probablemente con otro useState mas en el contexto  */}

    </div>
  );
}

export default App;
