import { useContext, useState } from "react";
import { SidebarSeccion } from "./SidebarSeccion";
import { MainContext } from "../contexts/MainContext";
import { useEtiqueta } from "../hooks/useEtiqueta";

export function Sidebar() {

  const { enviarConsulta, etiquetas } = useContext(MainContext)

  const {handleIcono} = useEtiqueta();

  const [listaAbierta, setListaAbierta] = useState(false);
  const handleLista = () => setListaAbierta(!listaAbierta);

  return (
    <aside className="flex flex-col bg-zinc-600 h-full min-w-[250px] border-r-2 border-black overflow-y-auto ">
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
        <div className="[&>button]:pl-8">
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
    </aside>
  );
}
