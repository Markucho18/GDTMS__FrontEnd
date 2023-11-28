import { useState } from "react";

export function useFormData(initialValue) {
    const [formData, setFormData] = useState(initialValue);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        //Si viene de modalTarea
        if(e.target.classList.value.includes("modal")){
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