import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { MainContext } from "../contexts/MainContext";

export function useEtiqueta(initialValue) {

    const { etiquetas } = useContext(MainContext);

    //CONTEXTO: AMBAS FUNCIONES GET SE ESTAN EJECUTANDO MUCHAS VECES Y NO SE PQ.

    const getIdEtiqueta = (nomEtiqueta) =>{
        if(etiquetas !== undefined){
            const etiquetaEncontrada = etiquetas.find(etiqueta => etiqueta.nombre == nomEtiqueta);
            if(etiquetaEncontrada){
                return etiquetaEncontrada.id_etiqueta
            }
            else console.log("etiquetaEncontrada es undefined ", etiquetaEncontrada)
        } else console.log("Etiquetas es undefined");
    }

    const getNomEtiqueta = (idEtiqueta)=>{
        if(etiquetas !== undefined){
            const etiquetaEncontrada = etiquetas.find(etiqueta => etiqueta.id_etiqueta == idEtiqueta);
            if(etiquetaEncontrada){
                return etiquetaEncontrada.nombre 
            }
            else console.log("etiquetaEncontrada es undefined ", etiquetaEncontrada)
        } else console.log("Etiquetas es undefined");
    }

    const getColor = (idEtiqueta)=>{
        if(etiquetas !== undefined){
            const etiquetaEncontrada = etiquetas.find(etiqueta => etiqueta.id_etiqueta == idEtiqueta);
            if(etiquetaEncontrada){
                return etiquetaEncontrada.color
            }
            else console.log("etiquetaEncontrada es undefined ", etiquetaEncontrada)
        } else console.log("Etiquetas es undefined");
    }

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

    return {getIdEtiqueta, getNomEtiqueta, getColor, handleIcono};
}