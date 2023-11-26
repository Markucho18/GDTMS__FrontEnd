import { createContext, useEffect, useState } from "react";
import { useModal } from "./hooks/useModal";

export const Contexto = createContext();

export function ContextoProvider({ children }) {

//ACTUALIZAR ESTO SIN NECESIDAD DE UN USESTATE
  const [actualizarMain, setActualizarMain] = useState(false);

  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [tareasConsulta, setTareasConsulta] = useState("inbox");

  const [etiquetas, setEtiquetas] = useState([]);

  return (
    <Contexto.Provider
      value={{
        tareasConsulta,
        setTareasConsulta,
        actualizarMain,
        setActualizarMain,
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
