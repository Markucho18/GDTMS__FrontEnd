import { useContext, useEffect} from "react";
import { useFormData } from '../hooks/useFormData';
import { TokenContext } from '../contexts/TokenContext';
import { ModalContext } from '../contexts/ModalContext';
import { MainContext } from '../contexts/MainContext';
import axios from "axios";

export function ModalTarea() {
  
  const {modalAbierto, datosTarea, cerrarModalTarea} = useContext(ModalContext);

  const {tokenValido, verificarToken, userId} = useContext(TokenContext);

  const { actualizarTareas, etiquetas, getEtiquetas} = useContext(MainContext);

  //Si es llamado para editar pone los datos de la tarea
  const initialFormData = modalAbierto === "editar" ? datosTarea : {
    nombre: "",
    fecha: "",
    prioridad: 1,
    idEtiqueta: 1,
    descripcion: null,
  }

  const {formData, setFormData, handleInputChange} = useFormData(initialFormData);

  useEffect(()=>{
    getEtiquetas();
  },[])

  const crearTarea = async (e) => {
    e.preventDefault();
    try{
      await verificarToken();
      if(tokenValido === true){
        if(formData.nombre.length < 5) throw new Error("La tarea debe contener un nombre");
        else{
          //Añade el userId
          const nuevoformData = {...formData, idUsuario: userId};
          axios.post("http://localhost:3001/tareas/crear", nuevoformData)
          .then((tareaRes)=>{
            alert("Tarea creada correctamente");
            setFormData({
              nombre: "",
              fecha: "",
              prioridad: "",
              idEtiqueta: "",
              descripcion: ""
            })
            actualizarTareas();
            cerrarModalTarea();
          }).catch((err)=> console.log("Hubo un error al consultar tareas/crear"))
        }
      } else throw new Error("El token es invalido")
    }
    catch(err){
      alert(err);
      console.log("Hubo un error al crear la tarea: ", err);
    }
  };

  const editarTarea = async (e) =>{
    e.preventDefault();
    try{
      await verificarToken();
      if(tokenValido === true){
        if(formData.nombre.length < 5) throw new Error("La tarea debe contener un nombre");
        else{
          axios.put("http://localhost:3001/tareas", formData)
          .then((editarRes)=>{
            alert("Tarea Editada correctamente");
            setFormData({
              nombre: "",
              fecha: "",
              prioridad: "",
              idEtiqueta: "",
              descripcion: "",
              idTarea: ""
            })
            actualizarTareas();
            cerrarModalTarea();
        }).catch((err)=> console.log("Hubo un error al consultar /tareas (PUT)"))
        }
      } else throw new Error("El token es invalido")
    }
    catch(err){
      alert(err);
      console.log("Hubo un error al editar la tarea", err);
    }
  }

  return (
    <div className="fondoModal cen col">
      <form onSubmit={modalAbierto === "editar" ? editarTarea : crearTarea} className="contenedorModal cen col">
        <label className="row">
          Nombre:
          <input
            type="text"
            className="modalNombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
          />
        </label>
        <label className="row">
          Fecha:
          <input
            type="date"
            className="modalFecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleInputChange}
          />
        </label>
        <label className="row">
          Prioridad:
          <select
            className='modalPrioridad'
            name="prioridad"
            value={formData.prioridad}
            onChange={handleInputChange}
          >
            <option value={1} className="rojo">
              1
            </option>
            <option value={2} className="naranja">
              2
            </option>
            <option value={3} className="amarillo">
              3
            </option>
            <option value={4} className="celeste">
              4
            </option>
          </select>
        </label>
        <label className="row">
          Etiqueta:
          <select
            className='modalEtiqueta'
            name="idEtiqueta"
            value={formData.idEtiqueta}
            onChange={handleInputChange}
          >
            {etiquetas ? (
              etiquetas.map((etiqueta, i) => (
                <option
                  key={i}
                  className={etiqueta.color}
                  value={etiqueta.id_etiqueta}
                >
                  {etiqueta.nombre}
                </option>
              ))
            ) : (
              <option>...</option>
            )}
          </select>
        </label>
        <label className="col">
          Descripcion:
          <textarea
            className="modalDesc"
            maxLength={80}
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
          ></textarea>
        </label>
        <div className="botones row">
          <button className="btn" onClick={cerrarModalTarea}>
            Cancelar
          </button>
          <button
            type="submit"
            className="btn"
          >
            {modalAbierto === "editar" ? "Editar" : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
