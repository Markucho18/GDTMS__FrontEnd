import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const Contexto = createContext();

export function ContextoProvider({ children }) {

  const [token, setToken] = useState("");

  const [tokenValido, setTokenValido] = useState(false);


  const [counter, setCounter] = useState(0);
  const verificarToken = async ()=>{
    try{
      /* console.log("verificarToken() ha recibido el token: ", token); */
      const verifyResponse = await axios.post("http://localhost:3001/token/verify", {token});
      /* console.log("verificarToken() ha devuelto: ", verifyResponse.data); */
      setTokenValido(verifyResponse.data.valido);
    }
    catch(err){
      console.log("Hubo un error al verificar el token", err)
    }
  }

  useEffect(()=>{
    /* console.log("Contexto dice que el valor de token ha cambiado a: ", token); */
    verificarToken();
    setCounter(counter + 1);
    console.log(`La funcion verificarToken se ha ejecutado ${counter} veces`);
  },[token])

  const [ tareasConsulta, setTareasConsulta ] = useState("");

  return (
    <Contexto.Provider value={{tareasConsulta, setTareasConsulta, token, setToken, tokenValido, setTokenValido, verificarToken}}>
      {children}
    </Contexto.Provider>
  );
}
