import { createContext, useEffect, useState} from "react";
import axios from 'axios';

export const ModalContext = createContext();

export function ModalContextProvider({children}){

    const [modalAbierto, setModalAbierto] = useState({accion: false});

    const [datosTarea, setDatosTarea] = useState();

    const handleModalTarea = (accion) =>{
        console.log("La accion recibida en handleModalTarea es: ", modalAbierto.accion);
        modalAbierto.accion === false ? setModalAbierto({accion: accion}) : setModalAbierto({accion: false});
        console.log("ModalAbierto ha cambiado a: ", modalAbierto);
    }

    return (
        <ModalContext.Provider value={{modalAbierto, setModalAbierto, datosTarea, setDatosTarea, handleModalTarea}}>
            {children}
        </ModalContext.Provider>
    )
}