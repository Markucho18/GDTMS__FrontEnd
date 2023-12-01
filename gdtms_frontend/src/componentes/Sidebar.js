import { useContext, useState, useEffect } from "react";
import { SidebarSeccion } from "./SidebarSeccion";
import axios from 'axios';
import { MainContext } from "../contexts/MainContext";
import { EtiquetaContext } from "../contexts/EtiquetaContext";

export function Sidebar(props) {

  const { enviarConsulta } = useContext(MainContext)

  const { etiquetas, getEtiquetas } = useContext(EtiquetaContext)

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
              click={() => enviarConsulta({etiqueta: etiqueta.nombre })}
            />
          ))}
          <SidebarSeccion
            icono="fa-solid fa-gear"
            texto="Gestionar"
            click={() => enviarConsulta({etiqueta: "gestionar"})}
          />
        </div>
      ) : null}
    </div>
  );
}
