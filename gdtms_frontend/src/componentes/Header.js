import { Contexto } from '../Contexto'
import { useContext, useEffect } from 'react'
import tskLogo from '../assets/TskLogo.png'

export function Header({abrirModalTarea}){
    /* const {toggleMostrarModal} = useContext(Contexto) */

    return (
        <div className="contenedorHeader row">
            <img src={tskLogo} alt="logo"/>
            <span className="btnCrearTarea" onClick={abrirModalTarea}><i className="fa-solid fa-plus"></i> </span>
        </div>
    )
}