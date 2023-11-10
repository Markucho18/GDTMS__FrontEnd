export function Register({handleForm}) {

  const enviarDatos = (e) => {
    e.preventDefault();
  };

  return (
    <div className="fondoFormulario col cen">
      <div className="contenedorFormulario register col">
        <h1>Registro</h1>
        <form className="col">
          <label className="col">
            Username:
            <input type="text" />
          </label>
          <label className="col">
            E-Mail:
            <input type="text" />
          </label>
          <label className="col">
            Pais:
            <select>
              <option>Afganistan</option>
              <option>Argentina</option>
            </select>
          </label>
          <label className="col">
            Contraseña:
            <input type="password" />
          </label>
          <label className="col">
            Confirmar contraseña:
            <input type="password" />
          </label>
          <button type="submit" className="btn" onSubmit={enviarDatos}>
            CREAR CUENTA
          </button>
          <span className="cambiarForm" onClick={handleForm}>Iniciar sesion</span>
        </form>
      </div>
    </div>
  );
}
