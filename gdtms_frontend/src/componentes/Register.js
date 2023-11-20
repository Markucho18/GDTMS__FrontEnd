//Register.js
import { useState } from "react";
import axios from "axios";

export function Register({ handleForm }) {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    pais: 0,
    password: "",
    confPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [msgError, setmsgError] = useState("");

  const validarDatos = async (e) => {
    e.preventDefault();
    const usuarioNoValido = await validarUsuario();
    const emailNoValido = await validarEmail();
    try {
      if (formData.username.length < 3)
        throw new Error("El username debe tener al menos 3 caracteres");
      if (!formData.email.includes("@"))
        throw new Error("Debes ingresar un e-mail valido");
      if (formData.email.length < 10)
        throw new Error("Debes ingresar un e-mail valido");
      if (formData.pais === 0)
        throw new Error("Debes elegir un pais")
      if (formData.password.length < 8)
        throw new Error("La contraseña debe tener al menos 8 caracteres");
      if (formData.password !== formData.confPassword)
        throw new Error("Las contraseñas no coinciden");
      if(usuarioNoValido)
        throw new Error(usuarioNoValido)
      if(emailNoValido)
        throw new Error(emailNoValido)
      setmsgError("");
      await enviarDatos();
      setFormData({
        username: "",
        email: "",
        pais: "",
        password: "",
        confPassword: "",
      });
      alert("Datos enviados correctamente");
    } catch (err) {
      console.log(err);
      setmsgError(err.message);
      console.log(msgError);
    }
    console.log("Datos del form:", formData);
  };

  const validarUsuario = async ()=>{
    try{
      const res = await axios.post("http://localhost:3001/register/username", formData);
      console.log(res.data);
      if(res.data.resultado.length > 0) return "El username ya esta en uso"
      else return
     }
    catch(err){
      console.log("Error en validarUsuario:", err.response); 
    }
  }

  const validarEmail = async ()=>{
    try{
      const response = await axios.post("http://localhost:3001/register/email", formData)
      console.log(response.data);
      if(response.data.resultado.length > 0) return "El e-mail ya esta en uso"
      else return
    }
    catch(err){
      console.log("Error en validarEmail:", err.response);
    }
  }

  const enviarDatos = async () => {
    try {
      const response = await axios.post("http://localhost:3001/register", formData);
      console.log(response.data);
    } catch (err) {
      console.log("Error:", err);
    }
    console.log("se ha ejecutado enviarDatos", formData);
  };

  const [paises, setPaises] = useState()
  const getPaises = async () => {
    try {
      const response = await axios.get("http://localhost:3001/paises");
      setPaises(response.data)
    } catch (err) {
      console.log("Ocurrio un error al solicitar paises: ", err)
    }
  };

  return (
    <div className="fondoFormulario col cen">
      <div className="contenedorFormulario register col">
        <h1>Registro</h1>
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
            E-Mail:
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
          <label className="col">
            Pais:
            <select
              name="pais"
              value={formData.pais}
              onChange={handleInputChange}
              onClick={getPaises}
            >
              {paises ? paises.map(pais =>(
                <option key={pais.id} value={pais.id}>{pais.nombre}</option>
              )) : null}
            </select>
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
          <label className="col">
            Confirmar contraseña:
            <input
              type="password"
              name="confPassword"
              value={formData.confPassword}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit" className="btn">
            CREAR CUENTA
          </button>
          <span className="cambiarForm" onClick={handleForm}>
            Iniciar sesion
          </span>
        </form>
      </div>
      {msgError.length > 0 ? (
        <span className="msgError">{msgError}</span>
      ) : null}
    </div>
  );
}
