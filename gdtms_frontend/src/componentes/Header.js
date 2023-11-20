import { Contexto } from '../Contexto';
import {Busqueda} from './Busqueda';
import { useContext, useEffect } from 'react';
import tskLogo from '../assets/TskLogo.png';

export function Header(){

    const {modalAbierto, setModalAbierto, handleModalTarea} = useContext(Contexto);

    return (
        <div className="contenedorHeader row">
            <div className='ladoIzquierdo row cen'>
                <img src={tskLogo} alt="logo"/>
                <Busqueda/>
            </div>
            <span className="btnCrearTarea" onClick={()=> handleModalTarea("crear")}><i className="fa-solid fa-plus"></i> </span>
        </div>
    )
}