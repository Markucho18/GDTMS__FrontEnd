import { createContext, useEffect, useState } from "react";

export const Contexto = createContext();

export function ContextoProvider({ children }) {

  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [etiquetas, setEtiquetas] = useState([]);

  return (
    <Contexto.Provider
      value={{
        textoBusqueda,
        setTextoBusqueda,
        etiquetas,
        setEtiquetas,
      }}
    >
      {children}
    </Contexto.Provider>
  );
}
