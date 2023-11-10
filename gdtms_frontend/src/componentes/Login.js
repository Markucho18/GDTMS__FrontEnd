export function Login({click}) {

  const enviarDatos = (e)=>{
    e.preventDefault();
  }

  return (
    <div className="fondoFormulario col cen">
      <div className="contenedorFormulario login col">
        <h1>Login</h1>
        <form className="col">
          <label className="col">
            Username:
            <input type="text" />
          </label>
          <label className="col">
            Contraseña:
            <input type="password" />
          </label>
          <button type="submit" className="btn" onClick={enviarDatos}>LOG IN</button>
          <span className="cambiarForm" onClick={click}>Registrarse</span>
        </form>
      </div>
    </div>
  );
}
