import { Contexto } from "../Contexto";
import { useState, useContext} from "react";
import axios from "axios";

export function Login({ handleForm }) {

  const {setToken} = useContext(Contexto);

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
      await crearToken();
    } catch (err) {
      setMsgError(err.message);
    }
  };

  const crearToken = async () => {
    try {
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

//ENVIAR TOKEN CADA VEZ QUE QUIERA MANDAR DATOS AL BACK (CREAR TAREAS; ELIMINAR Y ESO)
//PONER FECHATOKEN CAMPO Y COMPARAR SI PASARON 24HS
