import { useContext, useEffect, useState} from 'react';
import { MainContext } from '../contexts/MainContext';

export function Busqueda (){

    const [textoBusqueda, setTextoBusqueda] = useState("");
    
    const {enviarConsulta} = useContext(MainContext);

    const handleInputChange = (e)=>{
        const {value} = e.target;
        setTextoBusqueda(value);
    }

    return (
        <>
            <span className="busqueda row cen">
                <input type="text" placeholder="Buscar tarea..." value={textoBusqueda} onChange={handleInputChange}/>
                <i className="fa-solid fa-magnifying-glass lupa" onClick={()=> enviarConsulta({busqueda: textoBusqueda }) }></i>
            </span>
        </>
    )
}