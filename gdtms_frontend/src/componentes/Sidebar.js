import { Contexto } from "../Contexto";
import { useContext, useState, useEffect } from "react";
import { SidebarSeccion } from "./SidebarSeccion";
import { etiquetas } from "../datosSimulados/etiquetas";
import axios from 'axios';
import { MainContext } from "../contexts/MainContext";
import { EtiquetaContext } from "../contexts/EtiquetaContext";

export function Sidebar(props) {

  const { handleConsulta } = useContext(MainContext)

  const { etiquetas, getEtiquetas } = useContext(EtiquetaContext)

  const [listaAbierta, setListaAbierta] = useState(false);
  const handleLista = () => setListaAbierta(!listaAbierta);

  return (
    <div className="contenedorSidebar col">
      <SidebarSeccion
        icono="fa-solid fa-inbox"
        texto="Inbox"
        click={() => handleConsulta("inbox")}
      />
      <SidebarSeccion
        icono="fa-solid fa-thumbtack"
        texto="Hoy"
        click={() => handleConsulta("hoy")}
      />
      <SidebarSeccion
        icono="fa-regular fa-calendar-plus"
        texto="Proximo"
        click={() => handleConsulta("proximo")}
      />
      <SidebarSeccion
        icono="fa-solid fa-tags"
        texto="Etiquetas"
        click={handleLista}
        click2={getEtiquetas}
      />
      {listaAbierta === true ? (
        <div className="listaEtiquetas">
          {etiquetas.length > 0 &&
          etiquetas.map((etiqueta, i) => (
            <SidebarSeccion
              key={i}
              icono={"fa-solid fa-tags " /* + etiqueta.color */}
              texto={etiqueta.nombre}
              click={() => handleConsulta({etiqueta: etiqueta.nombre })}
            />
          ))}
          <SidebarSeccion
            icono="fa-solid fa-gear"
            texto="Gestionar"
            click={() => handleConsulta("gestionar")}
          />
        </div>
      ) : null}
    </div>
  );
}
