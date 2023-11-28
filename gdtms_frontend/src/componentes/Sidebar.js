import { Contexto } from "../Contexto";
import { useContext, useState, useEffect } from "react";
import { SidebarSeccion } from "./SidebarSeccion";
import { etiquetas } from "../datosSimulados/etiquetas";
import axios from 'axios';
import { MainContext } from "../contexts/MainContext";

export function Sidebar(props) {

  const { actualizarTareas } = useContext(MainContext)

  const { etiquetas, setEtiquetas } = useContext(Contexto);

  const [listaAbierta, setListaAbierta] = useState(false);
  const handleLista = () => setListaAbierta(!listaAbierta);
  
  const mostrarEtiquetas = async () => {
    const etiquetasRes = await axios.get("http://localhost:3001/etiquetas");
    setEtiquetas(etiquetasRes.data);
  }

  return (
    <div className="contenedorSidebar col">
      <SidebarSeccion
        icono="fa-solid fa-inbox"
        texto="Inbox"
        click={() => actualizarTareas("inbox")}
      />
      <SidebarSeccion
        icono="fa-solid fa-thumbtack"
        texto="Hoy"
        click={() => actualizarTareas("hoy")}
      />
      <SidebarSeccion
        icono="fa-regular fa-calendar-plus"
        texto="Proximo"
        click={() => actualizarTareas("proximo")}
      />
      <SidebarSeccion
        icono="fa-solid fa-tags"
        texto="Etiquetas"
        click={handleLista}
        click2={mostrarEtiquetas}
      />
      {listaAbierta === true ? (
        <div className="listaEtiquetas">
          {etiquetas.map((etiqueta, i) => (
            <SidebarSeccion
              key={i}
              icono={"fa-solid fa-tags " /* + etiqueta.color */}
              texto={etiqueta.nombre}
              click={() => actualizarTareas({etiqueta: etiqueta.nombre })}
            />
          ))}
          <SidebarSeccion
            icono="fa-solid fa-gear"
            texto="Gestionar"
            click={() => actualizarTareas("gestionar")}
            click2={mostrarEtiquetas}
          />
        </div>
      ) : null}
    </div>
  );
}
