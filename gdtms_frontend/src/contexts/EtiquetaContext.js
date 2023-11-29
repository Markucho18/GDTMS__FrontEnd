import { createContext, useEffect, useState} from "react";
import axios from 'axios';

export const EtiquetaContext = createContext();

export function EtiquetaContextProvider({children}){

    const [etiquetas, setEtiquetas] = useState([]);

    const getEtiquetas = async () => {
        const etiquetasRes = await axios.get("http://localhost:3001/etiquetas");
        console.log("Se ha ejecutado getEtiquetas y se ha obtenido: ", etiquetasRes.data);
        setEtiquetas(etiquetasRes.data);
    };

    return(
        <EtiquetaContext.Provider value={{
            etiquetas,
            setEtiquetas,
            getEtiquetas
        }}>
            {children}
        </EtiquetaContext.Provider>
    )
}