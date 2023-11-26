import { Contexto } from "./Contexto";
import { useContext, useState, useEffect } from "react";
import { TokenContext } from "./contexts/TokenContext";
import { TokenContextProvider } from "./contexts/TokenContext";
import { useToken } from "./hooks/useToken";
import { useModal } from "./hooks/useModal";
import { Login } from "./componentes/Login";
import { Register } from "./componentes/Register";
import { Header } from "./componentes/Header";
import { Sidebar } from "./componentes/Sidebar";
import { Main } from "./componentes/Main";
import { ModalTarea } from "./componentes/ModalTarea";

function App() {

  const {token, tokenValido, setTokenValido} = useContext(TokenContext);
/*   const {token, tokenValido, setTokenValido} = useToken(); */

  const {modalAbierto, handleModalTarea} = useModal();

  useEffect(() => {
    console.log("Modal abierto es: ", modalAbierto);
  }, [modalAbierto]);

  const [formulario, setFormulario] = useState("login");
  const handleForm = () => formulario === "login" ? setFormulario("register") : setFormulario("login");


  useEffect(() => {
    console.log("El valor de token en App.js es: ", token, "Y el de tokenValido es: ", tokenValido);
    if(tokenValido === false) setTokenValido(true); //ELIMINAR ESTA LINEA PARA SEGUIR ARREGLANDO LO DE APP Y TOKEN.
  }, [formulario, token, tokenValido]);

  useEffect(()=>{
    console.log("El valor de token en App.js es: ", token);
  },[token])

  return (
    <TokenContextProvider>
      <div className="App col">
        <button onClick={()=> handleModalTarea("crear")}>Modal crearTarea</button>
        <button onClick={()=> handleModalTarea("editar")}>Modal editarTarea</button>
        <button onClick={()=> console.log("Segun App token es:", token, "& tokenValido es: ", tokenValido)}> Mostrar Tokens</button>
        <button onClick={()=> console.log("Segun App modalAbierto  es: ", modalAbierto)}> Mostrar ModalAbierto</button>

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

        {modalAbierto.accion === false ? null
        : <ModalTarea/>
        }
        
      </div>
    </TokenContextProvider>
  );
}

export default App;
