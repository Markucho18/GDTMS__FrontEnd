
export function Etiquetas({nombre, color}){
    <div className="contenedorEtiquetas">
        <i className={color + "fa-solid fa-tags"}></i>
        <span>{nombre} </span>
        <button>Hola </button>
    </div>
}