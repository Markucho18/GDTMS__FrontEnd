
export function SidebarSeccion({ icono, texto, color, click}) {

  return (
    <div className="sidebarSeccion row" onClick={click}>
      <i className={icono} style={color && color}></i>
      <span style={color && color}>{texto}</span>
      {texto === "Etiquetas" ? (
        <i className="fa-solid fa-angle-down flechita"></i>
      ) : null}
    </div>
  );
}
