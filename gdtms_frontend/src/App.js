import { useContext, useState, useEffect } from "react";
import { TokenContext } from "./contexts/TokenContext";
import {ModalContext} from './contexts/ModalContext';
import { Login } from "./componentes/Login";
import { Register } from "./componentes/Register";
import { Header } from "./componentes/Header";
import { Sidebar } from "./componentes/Sidebar";
import { Main } from "./componentes/Main"; 
import { ModalTarea } from "./componentes/ModalTarea";
import { MainContextProvider } from "./contexts/MainContext";
import { EtiquetaContextProvider } from "./contexts/EtiquetaContext";

function App() {

  const {token, tokenValido, setTokenValido} = useContext(TokenContext);

  const {modalAbierto} = useContext(ModalContext);

  useEffect(() => {
    console.log("Modal abierto es: ", modalAbierto);
  }, [modalAbierto]);

  const [formulario, setFormulario] = useState("login");
  const handleForm = () => formulario === "login" ? setFormulario("register") : setFormulario("login");

  useEffect(()=>{
    console.log("El valor de token en App.js es: ", token, "& el valor de tokenValido es: ", tokenValido);
  },[token, tokenValido])

  //CONTEXTO: NO PUEDO SELECCIONAR "ninguna" EN LAS ETIQUETAS DEL MODAL TAREA
  return (
    <MainContextProvider>
      <EtiquetaContextProvider>
        <div className="App col">

          {tokenValido === false &&(
            (formulario === "login" && <Login handleForm={handleForm} />) ||
            (formulario === "register" && <Register handleForm={handleForm} />)
          )}

          {tokenValido === true && (
            <>
              <Header />
              <div className="sidebarMain row">
                <Sidebar />
                <Main />
              </div>
            </>
          )}

          {modalAbierto === false ? null
          : <ModalTarea/>
          }
          
        </div>
      </EtiquetaContextProvider>
    </MainContextProvider>
  );
}

export default App;
