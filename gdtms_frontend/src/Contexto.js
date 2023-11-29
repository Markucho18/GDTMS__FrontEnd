import { createContext, useEffect, useState } from "react";

export const Contexto = createContext();

export function ContextoProvider({ children }) {

  const [textoBusqueda, setTextoBusqueda] = useState("");

  return (
    <Contexto.Provider
      value={{
        textoBusqueda,
        setTextoBusqueda
      }}
    >
      {children}
    </Contexto.Provider>
  );
}
