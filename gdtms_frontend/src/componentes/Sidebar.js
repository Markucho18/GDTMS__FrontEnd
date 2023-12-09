import { useContext, useState, useEffect } from "react";
import { SidebarSeccion } from "./SidebarSeccion";
import axios from 'axios';
import { MainContext } from "../contexts/MainContext";
import { useEtiqueta } from "../hooks/useEtiqueta";

export function Sidebar(props) {

  const { enviarConsulta } = useContext(MainContext)

  const {etiquetas, handleIcono} = useEtiqueta();

  const [listaAbierta, setListaAbierta] = useState(false);
  const handleLista = () => setListaAbierta(!listaAbierta);

  return (
    <div className="contenedorSidebar col">
      <SidebarSeccion
        icono="fa-solid fa-inbox"
        texto="Inbox"
        click={() => enviarConsulta({fecha: "inbox"})}
      />
      <SidebarSeccion
        icono="fa-solid fa-thumbtack"
        texto="Hoy"
        click={() => enviarConsulta({fecha: "hoy"})}
      />
      <SidebarSeccion
        icono="fa-regular fa-calendar-plus"
        texto="Proximo"
        click={() => enviarConsulta({fecha: "proximo"})}
      />
      <SidebarSeccion
        icono="fa-solid fa-tags"
        texto="Etiquetas"
        click={handleLista}
      />
      {listaAbierta === true ? (
        <div className="listaEtiquetas">
          {etiquetas.length > 0 &&
          etiquetas.map((etiqueta, i) => (
            <SidebarSeccion
              key={i}
              texto={etiqueta.nombre}
              icono={handleIcono(etiqueta.id_etiqueta)}
              color={{color: etiqueta.color}}
              click={() => enviarConsulta({etiqueta: etiqueta.nombre })}
            />
          ))}
        </div>
      ) : null}
      <SidebarSeccion
        icono="fa-solid fa-circle-check"
        texto="Completas"
        click={()=> enviarConsulta({fecha: "completas"})}
      />
    </div>
  );
}
