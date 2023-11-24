import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const Contexto = createContext();

export function ContextoProvider({ children }) {

//USAR CODIGO APARTE DE TOKENS (CUSTOM HOOK)
  const [token, setToken] = useState("");

  const [tokenValido, setTokenValido] = useState(false);

//ACTUALIZAR ESTO SIN NECESIDAD DE UN USESTATE
  const [actualizarMain, setActualizarMain] = useState(false);

//SEPARAR LOGICA DE MODALES
  const [modalAbierto, setModalAbierto] = useState(false);

  const [datosTarea, setDatosTarea] = useState();
  //CUSTOM HOOK
  const handleModalTarea = (accion) =>{
    console.log(accion);
    modalAbierto === false ? setModalAbierto(accion) : setModalAbierto(false);
    console.log(modalAbierto);
  }


  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [tareasConsulta, setTareasConsulta] = useState("inbox");

  const [etiquetas, setEtiquetas] = useState([]);


//USAR CODIGO APARTE DE TOKENS (CUSTOM HOOK) (x2)
  const [counter, setCounter] = useState(0);
  const verificarToken = async () => {
    try {
      const verifyResponse = await axios.post(
        "http://localhost:3001/token/verify",
        { token }
      );
      setTokenValido(verifyResponse.data.valido);
    } catch (err) {
      console.log("Hubo un error al verificar el token", err);
    }
  };

  useEffect(() => {
    verificarToken();
    setCounter(counter + 1);
    console.log(`La funcion verificarToken se ha ejecutado ${counter} veces`);
  }, [token]);


  return (
    <Contexto.Provider
      value={{
        tareasConsulta,
        setTareasConsulta,
        token,
        setToken,
        tokenValido,
        setTokenValido,
        verificarToken,
        actualizarMain,
        setActualizarMain,
        modalAbierto,
        setModalAbierto,
        handleModalTarea,
        datosTarea,
        setDatosTarea,
        textoBusqueda,
        setTextoBusqueda,
        etiquetas,
        setEtiquetas
      }}
    >
      {children}
    </Contexto.Provider>
  );
}
