import { useContext, useState, useEffect } from "react";
import { TokenContext } from "./contexts/TokenContext";
import { ModalContext } from './contexts/ModalContext';
import { Login } from "./componentes/Login";
import { Register } from "./componentes/Register";
import { Header } from "./componentes/Header";
import { Sidebar } from "./componentes/Sidebar";
import { Main } from "./componentes/Main";
import { ModalTarea } from "./componentes/ModalTarea";

function App() {

  const { tokenValido } = useContext(TokenContext);

  const { modalAbierto } = useContext(ModalContext);

  const [formulario, setFormulario] = useState("login");
  const handleForm = () => formulario === "login" ? setFormulario("register") : setFormulario("login");

  //Forzar actualizacion en App.js
  useEffect(()=>{
    if(actualizacion === true){
      setActualizacion(false);
      console.log("Se ha re-renderizado App con las tareas actualizadas.")
    }
  },[actualizacion])

  return (
    <div className="App col">

      {tokenValido === false && (
        (formulario === "login" && <Login handleForm={handleForm} />) ||
        (formulario === "register" && <Register handleForm={handleForm} />)
      )}

      {modalAbierto === false ? null
        : <ModalTarea />
      }

      {tokenValido === true && (
        <>
          <Header />
          <div className="sidebarMain row">
            <Sidebar />
            <Main />
          </div>
        </>
      )}

      {/* Asi deberia manejarse */}
      {/* {consulta && consulta.fecha && (
        (consulta.fecha === 'inbox' && <TareasInbox/>) ||
        (consulta.fecha === 'hoy' && <TareasHoy/>)
        (consulta.fecha === 'proximo' <TareasProximo/>)
      )}
      
      {consulta && consulta.etiqueta && (
        (consulta.etiqueta === 'gestionar' ? <GestionarEt/>
        : <TareasEtiqueta etiqueta={consulta.etiqueta}/>)
      )}
      
      {consulta && consulta.busqueda && (
        <TareasBusqueda busqueda={consulta.busqueda}/>
      )} */}
      

    </div>
  );
}

export default App;
