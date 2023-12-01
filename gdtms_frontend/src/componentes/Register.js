//Register.js
import { useState } from "react";
import { useFormData } from "../hooks/useFormData";
import axios from "axios";

export function Register({ handleForm }) {

  const {formData, setFormData, handleInputChange} = useFormData({
    username: "",
    email: "",
    pais: 0,
    password: "",
    confPassword: "",
  })

  const [msgError, setMsgError] = useState("");

  const validarDatos = async (e)=>{
    try{
      e.preventDefault();
      //Valida el usuario:
      axios.post("http://localhost:3001/register/username", formData)
      .then((userRes)=>{
        if(userRes.data.resultado.length > 0) throw new Error("El username ya esta en uso")
      }).catch((err)=> console.log("Ha ocurrido un error al validarUsuario: ", err))
      //Valida E-mail:
      axios.post("http://localhost:3001/register/email", formData)
      .then((emailRes)=>{
        if(emailRes.data.resultado.length > 0) throw new Error("El e-mail ya esta en uso")
      }).catch((err)=> console.log("Ha ocurrido un error al verificar el email: ", err))
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
      setMsgError("");
      enviarDatos()
      .then((res)=>{
        console.log("Datos enviados desde verificarDatos(): ", formData, "Datos recibidos desde el backend: ", res.data  )
        setFormData({
          username: "",
          email: "",
          pais: "",
          password: "",
          confPassword: "",
        });
        alert("Datos enviados correctamente");
        handleForm();
      }).catch((err)=> console.log("Ha ocurrido un error al enviar datos dentro de verificarDatos(): ", err))
    }
    catch(err){ setMsgError(err.message) };
  }

  //CONTEXTO: PUEDO PRESCINDIR TOTALMENTE DE ENVIARDATOS Y USAR EL AXIOS DIRECTAMENTE EN VERIFICARDATOS()

  const enviarDatos = async ()=>{
    return axios.post("http://localhost:3001/register", formData)
    .then((res)=> console.log("Datos enviados correctamente", res.data))
    .catch((err)=> console.log("Ha ocurrido un error al enviar datos: ", err))
  }

  const [paises, setPaises] = useState()
  const getPaises = async () => {
    axios.get("http://localhost:3001/paises")
    .then((res)=> setPaises(res.data) )
    .catch((err)=> console.log("Ocurrio un error al solicitar paises: ", err))
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
