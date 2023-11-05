import { Contexto } from "../Contexto";
import { useContext, useEffect } from 'react'
import { Formulario } from "./Formulario";
import { Tarea } from "./Tarea";
import { GestionarEt } from "./GestionarEt";

export function Main(props) {

  const {tareasConsulta, setTareasConsulta} = useContext(Contexto)

  useEffect(()=>{
    console.log(tareasConsulta)
  },[tareasConsulta])

  return (
    <div className="contenedorMain col">
      {/* <GestionarEt /> */}
      <div className="listaTareas col">
        <Tarea/>
      </div>
    </div>
  );
}
