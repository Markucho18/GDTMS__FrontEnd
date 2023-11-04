import { SidebarSeccion } from "./componentes/SidebarSeccion";
import { etiquetas } from "./datosSimulados/etiquetas";
import { createContext } from "react";

export const Contexto = createContext();

export function ContextoProvider({ children }) {
  
  let crearEtiquetas = false;
  const toggleCrearEtiquetas = () => {
    crearEtiquetas = !crearEtiquetas;
    console.log("crearEtiquetas = " + crearEtiquetas);
  };
  return (
    <Contexto.Provider
      value={{ crearEtiquetas, toggleCrearEtiquetas}}
    >
      {children}
    </Contexto.Provider>
  );
}
