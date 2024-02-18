import { useState, useContext} from "react";
import {useFormData} from "../hooks/useFormData";
import axios from "axios";
import { TokenContext } from "../contexts/TokenContext";

export function Login({ handleForm }) {

  const {formData, setFormData, handleInputChange} = useFormData({
    username: "",
    password: ""
  })

  const {crearToken} = useContext(TokenContext);

  const [msgError, setMsgError] = useState("");

  const validarDatos = async (e) => {
    e.preventDefault();
    //Comprueba si el username y contraseña existen en la DB
    axios.post("http://localhost:3001/register/username", formData)
    .then((res)=>{
      if (res.data.resultado.length === 0) return setMsgError("El username no es correcto");
      else{
        //Comprueba si la contraseña coincide
        axios.post("http://localhost:3001/login/password", formData)
        .then((res)=>{
          if (res.data === false) return setMsgError("La contraseña no es correcta");
          else{
            if(msgError) setMsgError("");
            setFormData({
              username: "",
              password: "",
            });
            crearToken(formData);
          }
        }).catch((err)=> console.log("Ha ocurrido un error al verificar la contraseña: ", err))
      }
    }).catch((err)=> console.log("Ha ocurrido un error la validar el usuario: ", err))
  }

  return (
    <div className="flex flex-col items-center justify-center size-full bg-sky-500">
      <main
        className="flex flex-col text-center bg-white rounded-xl p-5 border-2 border-black"
        style={{boxShadow: "0px 0px 10px 1px rgba(0, 0, 0, 70%)"}}
      >
        <h1 className="text-4xl text-sky-800">Login</h1>
        <form className="flex flex-col gap-3 text-xl w-full" onSubmit={validarDatos}>
          <label className="flex flex-col gap-3 w-full">
            Username:
            <input
              className="border-b-2 border-b-black px-1 focus:outline-none"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </label>
          <label className="flex flex-col gap-3 w-full">
            Contraseña:
            <input
              className="border-b-2 border-b-black px-1 focus:outline-none"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit" className="btn">
            INICIAR SESION
          </button>
          <a href="#" className="cambiarForm" onClick={handleForm}>
            Registrarse
          </a>
        </form>
      </main>
      {/* Muestra el mensaje de error que obtenga de validarDatos() */}
      {msgError.length > 0 ? (
        <span className="msgError">{msgError}</span>
      ) : null}
    </div>
  );
}

