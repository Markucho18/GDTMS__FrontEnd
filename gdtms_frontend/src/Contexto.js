import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const Contexto = createContext();

export function ContextoProvider({ children }) {

  const [token, setToken] = useState("");

  const [tokenValido, setTokenValido] = useState(false);

  const verificarToken = async ()=>{
    try{
      const verifyResponse = await axios.post("http://localhost:3001/token/verify", {token});
      setTokenValido(verifyResponse.data.valido);
    }
    catch(err){
      console.log("Hubo un error al verificar el token", err)
    }
  }

  useEffect(()=>{
    verificarToken();
  },[token])

  const [ tareasConsulta, setTareasConsulta ] = useState("");

  return (
    <Contexto.Provider value={{tareasConsulta, setTareasConsulta, token, setToken, tokenValido, setTokenValido, verificarToken}}>
      {children}
    </Contexto.Provider>
  );
}
