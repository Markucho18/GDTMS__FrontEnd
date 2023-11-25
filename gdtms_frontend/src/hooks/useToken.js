import { useState, useEffect } from "react";
import axios from 'axios';

//CONTEXTO: FALTA IMPLEMENTARLO CON APP (PARA QUE REDIRECCIONE A LA PANTALLA PRINCIPAL)
//Y EN EL RESTO COMO BOTONES Y MODALTAREA PARA VERIFICAR.
//TAMBIEN USARLO PARA DEVOLVER LAS TAREAS MANDANDOLE EL USUARIO (que esta dentro del token).

export function useToken() {
    const [token, setToken] = useState("");

    const [tokenValido, setTokenValido] = useState(false);

    const crearToken = async (formData) => {
        try {
            const tokenResponse = await axios.post(
                "http://localhost:3001/token/create",
                formData
            );
            const tokenData = tokenResponse.data.token;
            setToken(tokenData);
        } catch (err) {
            console.log("Hubo un error al crear el token: ", err);
        }
    };

    const verificarToken = async () => {
        try {
            const verifyResponse = await axios.post(
                "http://localhost:3001/token/verify",
                { token }
            );
            setTokenValido(verifyResponse.data.valido);
            console.log("Se ha creado y verificado el token correctamente")
        } catch (err) {
            console.log("Hubo un error al verificar el token", err);
        }
    };
    

    return { token, setToken, tokenValido, crearToken, verificarToken};
}