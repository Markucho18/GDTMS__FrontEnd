import { useState } from "react"

export const useModal = () =>{

    const [modalAbierto, setModalAbierto] = useState({accion: false});

    const [datosTarea, setDatosTarea] = useState();

    const handleModalTarea = (accion) =>{
        console.log("La accion recibida en handleModalTarea es: ", modalAbierto.accion);
        modalAbierto.accion === false ? setModalAbierto({accion: accion}) : setModalAbierto({accion: false});
        console.log("ModalAbierto ha cambiado a: ", modalAbierto);
      }
    
    return {modalAbierto, setModalAbierto, datosTarea, setDatosTarea, handleModalTarea}
}