import { useState, useEffect} from "react";
import {useFormData} from "../hooks/useFormData";
import {useToken} from '../hooks/useToken';
import axios from "axios";

export function Login({ handleForm }) {

/*   const {setToken} = useContext(Contexto); */

  const {formData, setFormData, handleInputChange} = useFormData({
    username: "",
    password: ""
  })

  const {token, crearToken, verificarToken} = useToken()

  const [msgError, setMsgError] = useState("");

  const validarDatos = async (e) => {
    e.preventDefault();
    //Comprueba si el username y contraseña existen en la DB
    const resUsername = await axios.post(
      "http://localhost:3001/register/username",
      formData
    );
    const resPassword = await axios.post(
      "http://localhost:3001/login/password",
      formData
    );
    try {
      if (resUsername.data.resultado.length === 0)
        throw new Error("El username no es correcto");
      if (resPassword.data === false)
        throw new Error("La contraseña es incorrecta");
      setMsgError("");
      setFormData({
        username: "",
        password: "",
      });
      await crearToken(formData);
    } catch (err) {
      setMsgError(err.message);
    }
  };

  //Cuando se crea el token lo verifica y cambia el valor de tokenValido
  //Lo que hace que se renderize la pantalla principal
  useEffect(()=>{
    if(token.length > 0){
      const x = async ()=>{
        await verificarToken();
      }
      x();
    }
  },[token]) 

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

