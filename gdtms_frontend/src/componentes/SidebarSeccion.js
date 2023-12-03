
export function SidebarSeccion({ icono, texto, color, click, click2 }) {

  return (
    <div className="sidebarSeccion row" onClick={()=>{
      click();
      click2 && click2();
    }}>
      <i className={icono} style={color && color}></i>
      <span style={color && color}>{texto}</span>
      {texto === "Etiquetas" ? (
        <i className="fa-solid fa-angle-down flechita"></i>
      ) : null}
    </div>
  );
}
