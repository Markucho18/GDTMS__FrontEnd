import { createContext, useEffect, useState} from "react";
import axios from 'axios';

export const TokenContext = createContext();

export function TokenContextProvider({children}){

    const [token, setToken] = useState("");

    const [tokenValido, setTokenValido] = useState(false);

    const crearToken = async (formData) => {
        axios.post("http://localhost:3001/token/create", formData)
        .then((tokenRes)=>{
            const tokenData = tokenRes.data.token;
            setToken(tokenData);
        }).catch((err)=> console.log("Hubo un error al crear el token: ", err) )
    };

    const verificarToken = async () => {
        //Deberia haber un return antes del axios para que retorne una promesa y asi poder gestionarlo con .then/.catch en vez de async/await (en ModalTarea)
        axios.post("http://localhost:3001/token/verify", { token })
        .then((verifyRes)=>{
            setTokenValido(verifyRes.data.valido);
            console.log("Se ha creado y verificado el token correctamente")
        }).catch((err)=> console.log("Hubo un error al verificar el token", err) )
    };

    useEffect(()=>{
        if(token.length > 0) verificarToken()
        else console.log("token esta vacio: ", token);
    },[token])

    return (
        <TokenContext.Provider value={{token, setToken, tokenValido, setTokenValido, crearToken, verificarToken}}>
            {children}
        </TokenContext.Provider>
    )
}