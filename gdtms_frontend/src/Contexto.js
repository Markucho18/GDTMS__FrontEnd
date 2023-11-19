import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const Contexto = createContext();

export function ContextoProvider({ children }) {
  const [token, setToken] = useState("");

  const [tokenValido, setTokenValido] = useState(false);

  const [actualizarMain, setActualizarMain] = useState(false);

  const [modalAbierto, setModalAbierto] = useState(false);

  const handleModalTarea = (accion) =>{
    console.log(accion);
    modalAbierto === false ? setModalAbierto(accion) : setModalAbierto(false);
    console.log(modalAbierto);
  }

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

  const [tareasConsulta, setTareasConsulta] = useState("inbox");

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
      }}
    >
      {children}
    </Contexto.Provider>
  );
}
