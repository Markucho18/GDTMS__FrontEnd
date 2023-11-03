import { Contexto } from "../Contexto";
import { useContext } from "react";
import { ListaEtiquetas } from "./ListaEtiquetas";
import { SidebarSeccion } from "./SidebarSeccion";

export function Sidebar(props) {
  const { crearEtiquetas } = useContext(Contexto);
  return (
    <div className="contenedorSidebar col">
      <SidebarSeccion icono="fa-solid fa-inbox" texto="Inbox" />
      <SidebarSeccion icono="fa-solid fa-thumbtack" texto="Hoy" />
      <SidebarSeccion icono="fa-regular fa-calendar-plus" texto="Proximo" />
      <SidebarSeccion icono="fa-solid fa-tags" texto="Etiquetas" />
      {crearEtiquetas === true ? <ListaEtiquetas /> : null}
    </div>
  );
}
