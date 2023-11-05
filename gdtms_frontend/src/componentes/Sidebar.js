import { Contexto } from "../Contexto";
import { useContext, useState, useEffect} from "react";
import { ListaEtiquetas } from "./ListaEtiquetas";
import { SidebarSeccion } from "./SidebarSeccion";

export function Sidebar(props) {

  const {tareasConsulta, setTareasConsulta} = useContext(Contexto)

  const [listaAbierta, setListaAbierta] = useState(false)
  const handleLista = ()=> listaAbierta === false ? setListaAbierta(true) : setListaAbierta(false)
  useEffect(()=> console.log(listaAbierta), [listaAbierta])

  return (
    <div className="contenedorSidebar col">
      <SidebarSeccion icono="fa-solid fa-inbox" texto="Inbox" click={()=> setTareasConsulta("inbox")}/>
      <SidebarSeccion icono="fa-solid fa-thumbtack" texto="Hoy" click={()=> setTareasConsulta("hoy")}/>
      <SidebarSeccion icono="fa-regular fa-calendar-plus" texto="Proximo" click={()=> setTareasConsulta("proximo")}/>
      <SidebarSeccion icono="fa-solid fa-tags" texto="Etiquetas" click={handleLista} />
      {listaAbierta === true ? <ListaEtiquetas /> : null}
    </div>
  );
}
