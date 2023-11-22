import { useContext, useState } from "react";
import {Contexto} from '../Contexto';

export function GestionarEt(props) {

  const {etiquetas, setEtiquetas} = useContext(Contexto);

  return (
    <div className="contenedorGestionarEtiquetas col">
      {etiquetas.map((etiqueta, i) => (
        <div className="contenedorEtiqueta row" key={i}>
            <div className="datosEtiqueta row">
                <i className={"fa-solid fa-tags " /* + etiqueta.color */}></i>
                <span className={"nombreEtiqueta " /* + etiqueta.color */}>
                {etiqueta.nombre}
                </span>
            </div>
          <div className="acciones row">
            <span className="accion">
              <i className="fa-solid fa-pen-to-square"></i>
            </span>
            <span className="accion">
              <i className="fa-solid fa-trash-can"></i>
            </span>
          </div>
        </div>
      ))}
      <span className="btn">Crear Etiqueta</span>
    </div>
  );
}
