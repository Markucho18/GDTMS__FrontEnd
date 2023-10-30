import '../estilos/modalTarea.css'

export function ModalTarea(props) {
    return (
        <div className="fondoModal cen col">
            <div className="contenedorModal cen col">
                <label className='row'>Nombre:<input type="text" className="modalNombre"/></label>
                <label className='row'>Fecha:<input type="date" classNAme="modalFecha"/></label>
                <label className='row'>Etiqueta: 
                    <select>
                        <option>Etiqueta1</option>
                        <option>Etiqueta2</option>
                        <option>Etiqueta3</option>
                        <option>Etiqueta4</option>
                        <option>Etiqueta5</option>
                    </select>
                </label>
                <label className='col'>Descripcion: <textarea className='modalDesc' maxLength={150}></textarea></label>
                <span class="btn">Guardar</span>

            </div>
        </div>
    )
}