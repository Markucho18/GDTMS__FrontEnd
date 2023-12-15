import { createContext, useEffect, useState} from "react";
import axios from 'axios';

export const TokenContext = createContext();

export function TokenContextProvider({children}){

    const [token, setToken] = useState("");
    
    const crearToken = async (formData) => {
        axios.post("http://localhost:3001/token/create", formData)
        .then((tokenRes)=>{
            const tokenData = tokenRes.data.token;
            setToken(tokenData);
        }).catch((err)=> console.log("Hubo un error al crear el token: ", err) )
    };

    const [tokenValido, setTokenValido] = useState(false);
    
    const verificarToken = async () => {
        //Deberia haber un return antes del axios para que retorne una promesa y asi poder gestionarlo con .then/.catch en vez de async/await (en ModalTarea)
        axios.post("http://localhost:3001/token/verify", { token })
        .then((verifyRes)=>{
            setTokenValido(verifyRes.data.valido);
            getUserId();
            console.log("Se ha creado y verificado el token correctamente")
        }).catch((err)=> console.log("Hubo un error al verificar el token", err) )
    };

    const cerrarSesion = ()=>{
        let respuesta = window.confirm("Estas seguro de cerrar sesion?");
        if(respuesta === true){
            setToken("");
            verificarToken();
        }
    }

    const [userId, setUserId] = useState();

    const getUserId = ()=>{
        axios.post("http://localhost:3001/usuarios/obtenerId", {token})
        .then((res)=>{
            setUserId(res.data.result[0].id_usuario);
        })
        .catch((err)=> console.log("Ha ocurrido un error en getUserId: ", err))
    }

    useEffect(()=>{
        console.log("Se ha registrado el userId: ", userId);
    },[userId])

    useEffect(()=>{
        if(token.length > 0) verificarToken()
        else console.log("token esta vacio: ", token);
    },[token])

    return (
        <TokenContext.Provider value={{token, setToken, tokenValido, setTokenValido, crearToken, verificarToken, userId, getUserId, cerrarSesion}}>
            {children}
        </TokenContext.Provider>
    )
}