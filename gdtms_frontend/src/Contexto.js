import { createContext, useState } from "react";
import axios from 'axios';

export const Contexto = createContext();

export function ContextoProvider({ children }) {
  const [token, setToken] = useState();

  const verificarToken = async ()=>{
    try{
      const verifyResponse = await axios.post("http://localhost:3001/token/verify", {token});
      if(verifyResponse.data.msg == "valido") return true
      else return false
    }
    catch(err){
      console.log("Hubo un error al verificar el token", err)
    }
  }

  const [ tareasConsulta, setTareasConsulta ] = useState();

  return (
    <Contexto.Provider value={{tareasConsulta, setTareasConsulta, token, setToken, verificarToken}}>
      {children}
    </Contexto.Provider>
  );
}
