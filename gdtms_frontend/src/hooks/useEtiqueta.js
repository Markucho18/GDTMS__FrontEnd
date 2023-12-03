import { useState } from "react";
import axios from 'axios';

export function useEtiqueta(initialValue) {

    const [etiquetas, setEtiquetas] = useState([]);

    const getEtiquetas = async () => {
        axios.get("http://localhost:3001/etiquetas")
        .then((etiquetasRes)=> setEtiquetas(etiquetasRes.data.result) )
        .catch((err)=> console.log("Ha ocurrido un error en getEtiquetas(): ", err))
    };

    //PODRIA USAR USEMEMO
    //PODRIA OBTNER TODOS LOS COLORES DE UNA GESTIONAR A CUAL ASIGNARLE EN BASE AL PARAM.
    const [color, setColor] = useState("");
    const getColor = (idEtiqueta)=>{
        axios.get(`http://localhost:3001/etiquetas/getColor?idEtiqueta=${idEtiqueta}`)
        .then((colorRes)=>{
            setColor(colorRes.data.result[0].color);
        } )
        .catch((err)=> console.log("Ha ocurrido un error en getColor(): ", err))
    }

    const [nomEtiqueta, setNomEtiqueta] = useState("");

    const getNomEtiqueta = async (idEtiqueta) => {
        axios.get(`http://localhost:3001/etiquetas/getNombre?idEtiqueta=${idEtiqueta}`)
        .then((etiquetaRes)=>{
        const etiquetaResSQL = etiquetaRes.data?.result;
        if(etiquetaResSQL.length > 0) setNomEtiqueta(etiquetaResSQL[0].nombre)
        }).catch((err)=> console.log("Hubo un error en getNomEtiqueta: ", err))
    };

    const handleIcono = (idEtiqueta)=>{
        if(idEtiqueta !== undefined || idEtiqueta !== 0){
            if(idEtiqueta === 1 ) return "fa-solid fa-code" //Programacion
            else if(idEtiqueta === 2) return "fa-solid fa-music" //Musica
            else if(idEtiqueta === 3) return "fa-solid fa-house"//Hogar
            else if(idEtiqueta === 4) return "fa-solid fa-gamepad" //Ocio
            else if(idEtiqueta === 5) return "fa-solid fa-briefcase" //Trabajo
            else if(idEtiqueta === 6) return "fa-solid fa-graduation-cap" //Estudio
            else if(idEtiqueta === 7) return "fa-solid fa-user-group" //Social
            else if(idEtiqueta === 8) return "fa-solid fa-sack-dollar" //Finanzas
            else if(idEtiqueta === 9) return "fa-solid fa-football" //Deporte
            else if(idEtiqueta === 10) return "fa-solid fa-palette" //Arte
        }
        else console.log("handleIcono() ha recibido un idEtiqueta no valido: ", idEtiqueta); 
    }

    return { etiquetas, setEtiquetas, getEtiquetas, nomEtiqueta, setNomEtiqueta, getNomEtiqueta, handleIcono, color, setColor, getColor };
}