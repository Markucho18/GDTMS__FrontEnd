import { useState} from "react";

export function Register({handleForm}) {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    pais: "",
    password: "",
    confPassword: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    }
    )
  }

  const consoleDatos = (e) => {
    e.preventDefault();
    console.log("Datos del form:", formData)
  }

  return (
    <div className="fondoFormulario col cen">
      <div className="contenedorFormulario register col">
        <h1>Registro</h1>
        <form className="col" onSubmit={consoleDatos}>
          <label className="col">
            Username:
            <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
          </label>
          <label className="col">
            E-Mail:
            <input type="text" name="email" value={formData.email} onChange={handleInputChange}/>
          </label>
          <label className="col">
            Pais:
            <select name="pais" value={formData.pais} onChange={handleInputChange}>
              <option value="Afganistan" >Afganistan</option>
              <option value="Argentina" >Argentina</option>
            </select>
          </label>
          <label className="col">
            Contraseña:
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
          </label>
          <label className="col">
            Confirmar contraseña:
            <input type="password" name="confPassword" value={formData.confPassword} onChange={handleInputChange}/>
          </label>
          <button type="submit" className="btn" >
            CREAR CUENTA
          </button>
          <span className="cambiarForm" onClick={handleForm}>Iniciar sesion</span>
        </form>
      </div>
    </div>
  );
}
