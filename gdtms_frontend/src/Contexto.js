import { etiquetas } from "./datosSimulados/etiquetas";
import { createContext } from "react";

export const Contexto = createContext();

export function ContextoProvider({ children }) {
  const mostrarEtiquetas = () => {
    etiquetas.map((etiqueta) => {
      console.log(etiqueta.nombre);
      console.log(etiqueta.color);
    });
  };
  return <Contexto.Provider>{children}</Contexto.Provider>;
}
