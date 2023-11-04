import { SidebarSeccion } from "./SidebarSeccion";
import { etiquetas } from "../datosSimulados/etiquetas";

export function ListaEtiquetas(props) {
  return (
    <div className="listaEtiquetas">
      {etiquetas.map((etiqueta, i) => (
        <SidebarSeccion
          key={i}
          icono={"fa-solid fa-tags " + etiqueta.color}
          texto={etiqueta.nombre}
        />
      ))}
      <SidebarSeccion icono="fa-solid fa-gear" texto="Gestionar"/>
    </div>
  );
}
