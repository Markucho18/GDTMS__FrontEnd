import {Contexto} from '../Contexto';
import { useContext, useEffect} from 'react';
import axios from 'axios';

export function Busqueda (){
    
    const {textoBusqueda, setTextoBusqueda, setTareasConsulta, setActualizarMain} = useContext(Contexto);

    const handleInputChange = (e)=>{
        const {value} = e.target;
        setTextoBusqueda(value);
    }

    return (
        <>
            <span className="busqueda row cen">
                <input type="text" placeholder="Buscar tarea..." value={textoBusqueda} onChange={handleInputChange}/>
                <i className="fa-solid fa-magnifying-glass lupa" onClick={()=>{
                    setTareasConsulta("busqueda");
                    setActualizarMain(true);
                }}></i>
            </span>
        </>
    )
}