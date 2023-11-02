import {Contexto} from '../Contexto'
import {useContext} from 'react'


export function SidebarSeccion({ icono, texto }) {

    const {mostrarEtiquetas} = useContext(Contexto)

    return texto === "Etiquetas" ? (
        <div className="sidebarSeccion row" onClick={mostrarEtiquetas}>
            <i className={icono + " icono"}></i>
            <span>{texto}</span>
            <i className="fa-solid fa-angle-down flechita"></i> 
        </div>
    ) : (
        <div className="sidebarSeccion row">
            <i className={icono + " icono"}></i>
            <span>{texto}</span> 
        </div>
    )
}