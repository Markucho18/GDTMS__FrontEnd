import { Contexto } from "../Contexto";
import { useContext } from "react";

export function SidebarSeccion({ icono, texto, click }) {
/*   return texto === "Etiquetas" ? (
    <div className="sidebarSeccion row" onClick={click}>
      <i className={icono}></i>
      <span>{texto}</span>
      <i className="fa-solid fa-angle-down flechita"></i>
    </div>
  ) : (
    <div className="sidebarSeccion row" onclick={click}>
      <i className={icono}></i>
      <span>{texto}</span>
    </div>
  ); */

  return (
    <div className="sidebarSeccion row" onClick={click}>
      <i className={icono}></i>
      <span>{texto}</span>
      {texto === "Etiquetas" ? (
        <i className="fa-solid fa-angle-down flechita"></i>
      ) : null}
    </div>
  );
}
