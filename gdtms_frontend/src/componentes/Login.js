import { useState } from "react";

export function Login({ handleForm }) {

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      //Lo que sea que este dentro de formData se mantiene igual
      ...formData,
      //[name] no es la propiedad si no la variable que contiene el nombre de la prop.
      [name]: value
    }
    )
  }

  const validarDatos = (e) => {
    e.preventDefault();
    console.log("Datos del form:", formData)
  }

  return (
    <div className="fondoFormulario col cen">
      <div className="contenedorFormulario login col">
        <h1>Login</h1>
        <form className="col" onSubmit={validarDatos}>
          <label className="col">
            Username:
            <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
          </label>
          <label className="col">
            Contraseña:
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
          </label>
          <button type="submit" className="btn">LOG IN</button>
          <span className="cambiarForm" onClick={handleForm}>Registrarse</span>
        </form>
      </div>
    </div>
  );
}

//SIGUIENTES PASOS:
  //COMPROBAR QUE EL EMAIL NO SE REPITA EN EL REGISTRO
  //COMPROBAR QUE EXISTA EL USERNAME EN LA DATABASE
  //DESENCRIPTAR HASH Y COMPARAR CON LA CONTRA EN LA DATABASE
  //AÑADIR TOKEN DE LOGIN EN EL NAVEGADOR (SESSION STORAGE)
  //(!)SEPARAR LOGICA EN EXPRESS DE LOGIN Y REGISTER
