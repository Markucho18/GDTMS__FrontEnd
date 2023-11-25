import { useState } from "react";

export function useFormData(initialValue) {
    const [formData, setFormData] = useState(initialValue);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return { formData, setFormData, handleInputChange };
}