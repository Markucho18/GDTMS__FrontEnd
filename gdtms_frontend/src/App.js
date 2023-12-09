import { useContext, useState, useEffect } from "react";
import { Login } from "./componentes/Login";
import { Register } from "./componentes/Register";
import { Header } from "./componentes/Header";
import { Sidebar } from "./componentes/Sidebar";
import { ModalTarea } from "./componentes/ModalTarea";
import {TareasInbox} from "./componentes/TareasInbox"
import {TareasHoy} from "./componentes/TareasHoy"
import {TareasProximo} from "./componentes/TareasProximo"
import {TareasEtiqueta} from "./componentes/TareasEtiqueta"
import {TareasBusqueda} from "./componentes/TareasBusqueda"
import { TareasCompletas } from "./componentes/TareasCompletas";
import { ModalContext } from './contexts/ModalContext';
import { TokenContext } from "./contexts/TokenContext";
import { MainContext } from "./contexts/MainContext";

function App() {

  const { consulta} = useContext(MainContext);

  const { tokenValido } = useContext(TokenContext);

  const { modalAbierto } = useContext(ModalContext);

  const [formulario, setFormulario] = useState("login");
  const handleForm = () => formulario === "login" ? setFormulario("register") : setFormulario("login");
  
  useEffect(()=>{
    console.log("En App el valor de tokenValido ha cambiado a: ", tokenValido);
  },[tokenValido])

  return (
    <div className="App col">

      {tokenValido === false && (
        (formulario === "login" && <Login handleForm={handleForm} />) ||
        (formulario === "register" && <Register handleForm={handleForm} />)
      )}

      {modalAbierto === "editar" || modalAbierto === "crear" ? <ModalTarea/> : null}

      {tokenValido === true && (
        <>
          <Header />
          <div className="sidebarMain row">
            <Sidebar />
            {/* Se renderizan tareas segun que consulta recibe */}
            <div className="contenedorMain col">
              {/* ORDENAR TAREAS POR PRIORIDAD */}
              {consulta && (
                consulta.fecha && (
                  (consulta.fecha === 'inbox' && <TareasInbox/>) ||
                  (consulta.fecha === 'hoy' && <TareasHoy/>) ||
                  (consulta.fecha === 'proximo' && <TareasProximo/>) ||
                  (consulta.fecha === 'completas' && <TareasCompletas/>)
                ) ||
                consulta.etiqueta && (
                  (consulta.etiqueta && <TareasEtiqueta etiqueta={consulta.etiqueta}/>)
                ) ||
                consulta.busqueda && (
                  <TareasBusqueda textoBusqueda={consulta.busqueda}/>
                )
              )}
            </div>
          </div>
        </>
      )}

    </div>
  );
}

export default App;
