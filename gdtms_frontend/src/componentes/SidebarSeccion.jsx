
export function SidebarSeccion({ icono, texto, color, click}) {

  return (
    <button
      className="flex w-full h-16 text-white text-lg gap-3 py-5 px-3  box-border border-b-2 border-black hover:bg-zinc-500 hover:h-[70px] transition-height duration-300 ease-in-out"
      onClick={click}
    >
      <i className={icono} style={color && color}></i>
      <span style={color && color}>{texto}</span>
      {texto === "Etiquetas" ? (
        <i className="fa-solid fa-angle-down flechita"></i>
      ) : null}
    </button>
  );
}
