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
        if(userRes.data.resultado.length > 0) return setMsgError("El username ya esta en uso")
      }).catch((err)=> console.log("Ha ocurrido un error al validarUsuario: ", err))
      //Valida E-mail:
      axios.post("http://localhost:3001/register/email", formData)
      .then((emailRes)=>{
        if(emailRes.data.resultado.length > 0) return setMsgError("El e-mail ya esta en uso")
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
      //Enviar datos al backend:
      axios.post("http://localhost:3001/register", formData)
      .then((res)=>{
        setFormData({
          username: "",
          email: "",
          pais: "",
          password: "",
          confPassword: "",
        });
        alert("Datos enviados correctamente");
        //Redirecciona al login
        handleForm();
      }).catch((err)=> console.log("Ha ocurrido un error al enviar datos dentro de verificarDatos(): ", err))
    }
    catch(err){ setMsgError(err.message) };
  }

  const [paises, setPaises] = useState()
  const getPaises = async () => {
    axios.get("http://localhost:3001/paises")
    .then((res)=> setPaises(res.data) )
    .catch((err)=> console.log("Ocurrio un error al solicitar paises: ", err))
  };

  return (
    <div className="flex flex-col items-center justify-center size-full bg-sky-500">
       <main
        className="flex flex-col text-center bg-white rounded-xl py-5 px-10 border-2 border-black "
        style={{boxShadow: "0px 0px 10px 1px rgba(0, 0, 0, 70%)"}}
      >
        <h1 className="text-4xl text-sky-800">Registro</h1>
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
            E-Mail:
            <input
              className="border-b-2 border-b-black px-1 focus:outline-none"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
          <label className="flex flex-col gap-3 w-full">
            Pais:
            <select
              className="text-center px-2 py-1 rounded border-2 border-zinc-300"
              name="pais"
              value={formData.pais}
              onChange={handleInputChange}
              onClick={getPaises}
            >
              {paises && paises.map(pais =>(
                <option key={pais.id} value={pais.id}>{pais.nombre}</option>
              ))}
            </select>
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
          <label className="flex flex-col gap-3 w-full">
            Confirmar contraseña:
            <input
              className="border-b-2 border-b-black px-1 focus:outline-none"
              type="password"
              name="confPassword"
              value={formData.confPassword}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit" className="btn">
            CREAR CUENTA
          </button>
          <a href="#" className="cambiarForm" onClick={handleForm}>
            Iniciar sesion
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
