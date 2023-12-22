import { useState } from "react";

export function useFormData(initialValue) {

    const [formData, setFormData] = useState(initialValue);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        //Si viene de modalTarea
        if(e.target.classList.value.includes("modal")){
            //Si le llega el valor prioridad o etiqueta lo pasa a numero
            const intValue = name === "prioridad" || name === "idEtiqueta" ? parseInt(value) : value;
            setFormData({
            ...formData,
            [name]: intValue,
            });
        }
        //Si viene desde login o register
        else{
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };



    return { formData, setFormData, handleInputChange };
}