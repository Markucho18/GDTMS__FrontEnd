import { useState, useEffect, useContext} from "react";
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
            if(msgError)
            setMsgError("");
            setFormData({
              username: "",
              password: "",
            });
            crearToken(formData);
          }
        }).catch((err)=> console.log("Ha ocurrido un error al verificar la contraseña: ", err))
      }
    })
  }

  return (
    <div className="fondoFormulario col cen">
      <div className="contenedorFormulario login col">
        <h1>Login</h1>
        <form className="col" onSubmit={validarDatos}>
          <label className="col">
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </label>
          <label className="col">
            Contraseña:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit" className="btn">
            INICIAR SESION
          </button>
          <span className="cambiarForm" onClick={handleForm}>
            Registrarse
          </span>
        </form>
      </div>
      {msgError.length > 0 ? (
        <span className="msgError">{msgError}</span>
      ) : null}
    </div>
  );
}

