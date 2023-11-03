import { Contexto } from '../Contexto'
import { useContext } from 'react'
import tskLogo from '../assets/TskLogo.png'

export function Header(props){
    const {toggleMostrarModal} = useContext(Contexto)
    return (
        <div className="contenedorHeader row">
            <img src={tskLogo} alt="logo"/>
            <span className="btnCrearTarea"><i className="fa-solid fa-plus" onClick={()=> toggleMostrarModal()}></i> </span>
        </div>
    )
}