import { useEffect, useState } from "react";
import axios from 'axios';

export function useEtiqueta(initialValue) {

    const [etiquetas, setEtiquetas] = useState([]);

    const getEtiquetas = async () => {
        console.log("Se ha ejecutado getEtiquetas()");
        axios.get("http://localhost:3001/etiquetas")
        .then((etiquetasRes)=> setEtiquetas(etiquetasRes.data.result) )
        .catch((err)=> console.log("Ha ocurrido un error en getEtiquetas(): ", err))
    };

    //CONTEXTO: AMBAS FUNCIONES GET SE ESTAN EJECUTANDO MUCHAS VECES Y NO SE PQ.

    const getNomEtiqueta = (idEtiqueta)=>{
        console.log("Se ha ejecuto getNomEtiqueta()");
        if(etiquetas !== undefined){
            const etiquetaEncontrada = etiquetas.find(etiqueta => etiqueta.id_etiqueta == idEtiqueta);
            if(etiquetaEncontrada){
                /* console.log("etiquetaEncontrada: ", etiquetaEncontrada);
                console.log("etiquetaEncontrada.nombre: ", etiquetaEncontrada.nombre); */
                return etiquetaEncontrada.nombre
            }
            else console.log("etiquetaEncontrada es undefined ", etiquetaEncontrada)
        } else console.log("Etiquetas es undefined");
    }

    const getColor = (idEtiqueta)=>{
        console.log("Se ha ejecutado getColor()")
        if(etiquetas !== undefined){
            const etiquetaEncontrada = etiquetas.find(etiqueta => etiqueta.id_etiqueta == idEtiqueta);
            if(etiquetaEncontrada){
                /* console.log("etiquetaEncontrada: ", etiquetaEncontrada);
                console.log("etiquetaEncontrada.color: ", etiquetaEncontrada.color); */
                return etiquetaEncontrada.color
            }
            else console.log("etiquetaEncontrada es undefined ", etiquetaEncontrada)
        } else console.log("Etiquetas es undefined");
    }

    const [nomEtiqueta, setNomEtiqueta] = useState("");

    const handleIcono = (idEtiqueta)=>{
        if(idEtiqueta !== undefined || idEtiqueta !== 0){
            if(idEtiqueta === 1 ) return "fa-solid fa-code" //Programacion
            else if(idEtiqueta === 2) return "fa-solid fa-music" //Musica
            else if(idEtiqueta === 3) return "fa-solid fa-house"//Hogar
            else if(idEtiqueta === 4) return "fa-solid fa-gamepad" //Ocio
            else if(idEtiqueta === 5) return "fa-solid fa-briefcase" //Trabajo
            else if(idEtiqueta === 6) return "fa-solid fa-graduation-cap" //Estudio
            else if(idEtiqueta === 7) return "fa-solid fa-sack-dollar" //Finanzas
            else if(idEtiqueta === 8) return "fa-solid fa-football" //Deporte
            else if(idEtiqueta === 9) return "fa-solid fa-user-group" //Social
            else if(idEtiqueta === 10) return "fa-solid fa-palette" //Arte
        }
        else console.log("handleIcono() ha recibido un idEtiqueta no valido: ", idEtiqueta); 
    }

    useEffect(()=>{
        getEtiquetas();
    },[])

    return { etiquetas, setEtiquetas, getEtiquetas, nomEtiqueta, setNomEtiqueta, getNomEtiqueta, handleIcono, getColor};
}