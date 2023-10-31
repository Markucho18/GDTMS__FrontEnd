
export function Formulario(props) {
  return props.form === "register" ? (
    <>
      <div className="contenedorForm col cen">
        <h1 className="cen">Formulario Registro</h1>
        <label className="col cen">
          UserName: <input type="text" />
        </label>
        <label className="col cen">
          Pais: <input type="text" />
        </label>
        <label className="col cen">
          E-Mail: <input type="text" />
        </label>
        <label className="col cen">
          Contraseña: <input type="password" />
        </label>
        <label className="col cen">
          Confirmar Contraseña: <input type="password" />
        </label>
        <span className="btn">Registrarse</span>
      </div>
    </>
  ) : (
    <>
      <div className="contenedorForm col cen">
        <h1 className="cen">Formulario Login</h1>
        <label className="col cen">
          UserName: <input type="text" />
        </label>
        <label className="col cen">
          Contraseña: <input type="password" />
        </label>
        <span className="btn">Iniciar Sesion</span>
      </div>
    </>
  );
}
