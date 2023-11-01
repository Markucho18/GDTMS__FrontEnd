import tskLogo from '../assets/TskLogo.png'

export function Header(props){
    return (
        <div className="contenedorHeader row">
            <img src={tskLogo} alt="logo"/>
            <span className="btnCrearTarea"><i className="fa-solid fa-plus"></i></span>
        </div>
    )
}