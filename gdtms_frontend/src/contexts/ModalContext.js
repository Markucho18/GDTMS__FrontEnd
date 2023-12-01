import { createContext, useEffect, useState} from "react";

export const ModalContext = createContext();

export function ModalContextProvider({children}){

    const [modalAbierto, setModalAbierto] = useState(false);

    const [datosTarea, setDatosTarea] = useState();

    useEffect(()=>{
        console.log("En modalContext, datosTareas es: ", datosTarea);
    },[datosTarea])

    const handleDatosTarea = (datos) => setDatosTarea(datos);

    const cerrarModalTarea = ()=> setModalAbierto(false);

    const abrirModalTarea = (accion) => setModalAbierto(accion);

    return (
        <ModalContext.Provider 
            value={{
                modalAbierto,
                setModalAbierto, 
                datosTarea, 
                setDatosTarea, 
                handleDatosTarea, 
                cerrarModalTarea, 
                abrirModalTarea}}
        >
            {children}
        </ModalContext.Provider>
    )
}