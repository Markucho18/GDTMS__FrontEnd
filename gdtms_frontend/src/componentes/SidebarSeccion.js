
export function SidebarSeccion({icono, texto}){
    return (
        <div className="sidebarSeccion row">
            <i className={icono + " icono"}></i>
            {texto}
        </div>
    )
}