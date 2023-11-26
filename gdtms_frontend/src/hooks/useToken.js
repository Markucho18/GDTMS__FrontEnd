import { useEffect, useState} from "react";
import axios from 'axios';


export function useToken() {
    const [token, setToken] = useState("");

    const [tokenValido, setTokenValido] = useState(false);

    const crearToken = async (formData) => {
        try {
            console.log("Se ha ejecutado crearToken()");
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
            console.log("Se ha ejecutado verificarToken y recibio el token: ", token);
            const verifyResponse = await axios.post(
                "http://localhost:3001/token/verify",
                { token }
            );
            setTokenValido(verifyResponse.data.valido);
            console.log("La verificacion del token ha devuelto: ", verifyResponse.data.valido)
            console.log("Se ha creado y verificado el token correctamente")
        } catch (err) {
            console.log("Hubo un error al verificar el token", err);
        }
    };

    useEffect(()=>{
        if(token.length > 0) verificarToken()
        else console.log("token esta vacio: ", token);
    },[token])

    useEffect(()=>{
        if(tokenValido === true){
            console.log("El valor del token es: ", token);
            console.log("El valor de tokenValido en useToken es: ", tokenValido);
        }
        else console.log("Token valido es: ", tokenValido, "& token es: ", token);
    },[tokenValido])
    

    return { token, setToken, tokenValido, setTokenValido, crearToken, verificarToken};
}
    //CONTEXTO: FALTA IMPLEMENTARLO CON APP (PARA QUE REDIRECCIONE A LA PANTALLA PRINCIPAL)
    //Y EN EL RESTO COMO BOTONES Y MODALTAREA PARA VERIFICAR.
    //TAMBIEN USARLO PARA DEVOLVER LAS TAREAS MANDANDOLE EL USUARIO (que esta dentro del token).