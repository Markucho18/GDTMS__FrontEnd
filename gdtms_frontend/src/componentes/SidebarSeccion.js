
export function SidebarSeccion({ icono, texto, click, click2 }) {

  return (
    <div className="sidebarSeccion row" onClick={()=>{
      click();
      click2 && click2();
    }}>
      <i className={icono}></i>
      <span>{texto}</span>
      {texto === "Etiquetas" ? (
        <i className="fa-solid fa-angle-down flechita"></i>
      ) : null}
    </div>
  );
}
