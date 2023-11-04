import { Contexto } from "../Contexto";
import { useContext } from "react";

export function SidebarSeccion({ icono, texto, handleLista }) {
/*   const { toggleCrearEtiquetas } = useContext(Contexto); */

  return texto === "Etiquetas" ? (
    <div className="sidebarSeccion row" onClick={handleLista}>
      <i className={icono}></i>
      <span>{texto}</span>
      <i className="fa-solid fa-angle-down flechita"></i>
    </div>
  ) : (
    <div className="sidebarSeccion row">
      <i className={icono}></i>
      <span>{texto}</span>
    </div>
  );
}
