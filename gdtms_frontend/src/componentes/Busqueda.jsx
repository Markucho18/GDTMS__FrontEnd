import { useContext, useEffect, useState} from 'react';
import { MainContext } from '../contexts/MainContext';
import { IoSearch } from "react-icons/io5";

export function Busqueda (){

    const [textoBusqueda, setTextoBusqueda] = useState("");
    
    const {enviarConsulta} = useContext(MainContext);

    const handleInputChange = (e)=>{
        const {value} = e.target;
        setTextoBusqueda(value);
    }

    return (
      <div className="flex items-center justify-center w-[350px] overflow-hidden rounded-xl bg-white border-[1px] border-black text-black">
        <input
          className='grow p-3 text-lg focus:outline-none'
          type="text"
          placeholder="Buscar tarea..."
          value={textoBusqueda}
          onChange={handleInputChange}
        />
        <button className='flex h-full p-1 hover:text-zinc-500'>
          <IoSearch className="size-6" onClick={()=> enviarConsulta({busqueda: textoBusqueda }) }/>
        </button>
      </div>
    )
}