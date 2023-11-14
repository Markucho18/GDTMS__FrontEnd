import { useState } from "react";
import axios from "axios";

export function Login({ handleForm }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      //Lo que sea que este dentro de formData se mantiene igual
      ...formData,
      //[name] no es la propiedad si no la variable que contiene el nombre de la prop.
      [name]: value,
    });
  };

  const [msgError, setMsgError] = useState("");

  const validarDatos = async (e) => {
    e.preventDefault();
    const resUsername = await axios.post("http://localhost:3001/register/username",formData);
    const resPassword = await axios.post("http://localhost:3001/login/password",formData);
    const token = await axios.post("http://localhost:3001/login/token", formData);
    console.log("Respuesta de obtener token:", token.data);
    try {
      // Comprobar si hay cookies
      if (document.cookie) {
        console.log("Tienes cookies en el navegador.");
      } else {
        console.log("No hay cookies en el navegador.");
      }
      if (resUsername.data.resultado.length == 0)
        throw new Error("El username no es correcto");
      else console.log("El username esta bien");
      if (resPassword.data == false)
        throw new Error("La contraseña es incorrecta");
      else console.log("La contraseña es correcta");
      setMsgError("");
      setFormData({
        username: "",
        password: "",
      });
    } catch (err) {
      setMsgError(err.message);
    }
  };

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
            LOG IN
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

//SIGUIENTES PASOS:
//COMPROBAR QUE EL EMAIL NO SE REPITA EN EL REGISTRO
//COMPROBAR QUE EXISTA EL USERNAME EN LA DATABASE
//DESENCRIPTAR HASH Y COMPARAR CON LA CONTRA EN LA DATABASE
//AÑADIR TOKEN DE LOGIN EN EL NAVEGADOR (LOCAL STORAGE(COOKIES))
//(!)SEPARAR LOGICA EN EXPRESS DE LOGIN Y REGISTER
