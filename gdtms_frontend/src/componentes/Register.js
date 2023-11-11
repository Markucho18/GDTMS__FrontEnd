//Register.js
import { useState } from "react";
import axios from 'axios';

export function Register({ handleForm }) {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    pais: "",
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

  const [codigoError, setCodigoError] = useState("");

  const validarDatos = async (e) => {
    e.preventDefault();
    try {
      if (formData.username.length < 3)
        throw new Error("El username debe tener al menos 3 caracteres");
      if (!formData.email.includes("@"))
        throw new Error("Debes ingresar un e-mail valido");
      if (formData.email.length < 10)
        throw new Error("Debes ingresar un e-mail valido");
      if (formData.password.length < 8)
        throw new Error("La contraseña debe tener al menor 8 caracteres");
      if (formData.password !== formData.confPassword)
        throw new Error("Las contraseñas no coinciden");
      setCodigoError("");
      await enviarDatos();
      setFormData({username: "", email: "", pais:"", password: "", confPassword: ""});
      alert("Datos enviados correctamente");
    } catch (err) {
      console.log(err);
      setCodigoError(err.message);
      console.log(codigoError);
    }
    console.log("Datos del form:", formData);
  };

  const enviarDatos = async ()=>{
    try{
      const response = await axios.post('http://localhost:3001/usuarios', formData, {
        headers: { 'Content-type': 'application/json'}
      })
      console.log(response.data);
    }
    catch(err){
      console.log('Error:', err);
    }
    console.log("se ha ejecutado enviarDatos", formData)
  }

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
            >
              <option value={1}>Afganistan</option>
              <option value={2}>Argentina</option>
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
      {codigoError.length > 0 ? <span className="codigoError">{codigoError}</span> : null}
    </div>
  );
}
