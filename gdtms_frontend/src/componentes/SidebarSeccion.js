import {etiquetas} from "../datosSimulados/etiquetas"
import {Etiquetas} from "./Etiquetas"

const mostrarEtiquetas = ()=>{
    etiquetas.map((etiqueta, index) =>{
        console.log(etiqueta.nombre)
        console.log(etiqueta.color)
        return (
            <Etiquetas key={index} nombre={etiqueta.nombre} color={etiqueta.color}/>
        )
    })
}

export function SidebarSeccion({ icono, texto }) {
    return texto === "Etiquetas" ? (
        <div className="sidebarSeccion row" onClick={()=> mostrarEtiquetas()}>
            <i className={icono + " icono"}></i>
            <span>{texto}</span>
            <i className="fa-solid fa-angle-down flechita"></i> 
            <Etiquetas/>
        </div>
    ) : (
        <div className="sidebarSeccion row">
            <i className={icono + " icono"}></i>
            <span>{texto}</span> 
        </div>
    )
}