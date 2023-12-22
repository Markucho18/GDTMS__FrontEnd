import { useContext } from 'react';
import { ModalContext } from '../contexts/ModalContext';
import {Busqueda} from './Busqueda';
import tskLogo from '../assets/TskLogo.png';

export function Header(){

    const {abrirModalTarea} = useContext(ModalContext);

    return (
        <div className="contenedorHeader row">
            <div className='ladoIzquierdo row cen'>
                <img src={tskLogo} alt="logo"/>
                <Busqueda/>
            </div>
            <div className='acciones row cen'>
                <span className="btnCrearTarea" onClick={()=> abrirModalTarea("crear")}><i className="fa-solid fa-plus"></i> </span>
            </div>
        </div>
    )
}