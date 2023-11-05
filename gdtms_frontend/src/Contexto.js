import { createContext, useState } from "react";

export const Contexto = createContext();

export function ContextoProvider({ children }) {
  const [ tareasConsulta, setTareasConsulta ] = useState();

  return (
    <Contexto.Provider value={{tareasConsulta, setTareasConsulta}}>
      {children}
    </Contexto.Provider>
  );
}
