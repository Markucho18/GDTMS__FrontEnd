import '../estilos/formulario.css'

export function Formulario(props){
    return(
        <>
            <div className='contenedorForm col cen'>
                <h1 className='cen'>Formulario</h1>
                <label className='col cen'>UserName: <input type="text"/></label>
                <label className='col cen'>Pais: <input type="text"/></label>
                <label className='col cen'>E-Mail: <input type="text"/></label>
                <label className='col cen'>Contraseña: <input type="password"/></label>
                <label className='col cen'>Confirmar Contraseña: <input type="password"/></label>
                <span className='btn'>Registrarse</span>
            </div>
        </>
    )
}