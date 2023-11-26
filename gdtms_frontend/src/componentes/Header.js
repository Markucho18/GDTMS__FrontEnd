import { Contexto } from '../Contexto';
import { useContext } from 'react';
import { useModal } from '../hooks/useModal';
import {Busqueda} from './Busqueda';
import tskLogo from '../assets/TskLogo.png';

export function Header(){

    const {handleModalTarea} = useModal();

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