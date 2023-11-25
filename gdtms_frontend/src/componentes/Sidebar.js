import { Contexto } from "../Contexto";
import { useContext, useState, useEffect } from "react";
import { SidebarSeccion } from "./SidebarSeccion";
import { etiquetas } from "../datosSimulados/etiquetas";
import axios from 'axios';

export function Sidebar(props) {
  const { setTareasConsulta, etiquetas, setEtiquetas } = useContext(Contexto);

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
        click={() => setTareasConsulta("inbox")}
      />
      <SidebarSeccion
        icono="fa-solid fa-thumbtack"
        texto="Hoy"
        click={() => setTareasConsulta("hoy")}
      />
      <SidebarSeccion
        icono="fa-regular fa-calendar-plus"
        texto="Proximo"
        click={() => setTareasConsulta("proximo")}
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
              click={() => setTareasConsulta(etiqueta.nombre)}
            />
          ))}
          <SidebarSeccion
            icono="fa-solid fa-gear"
            texto="Gestionar"
            click={() => setTareasConsulta("gestionar")}
            click2={mostrarEtiquetas}
          />
        </div>
      ) : null}
    </div>
  );
}
