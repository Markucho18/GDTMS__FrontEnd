import { useState, useContext, useEffect} from "react";
import { useFormData } from '../hooks/useFormData';
import axios from "axios";
import { TokenContext } from '../contexts/TokenContext';
import { ModalContext } from '../contexts/ModalContext';
import { MainContext } from '../contexts/MainContext';
import { useEtiqueta} from '../hooks/useEtiqueta';

export function ModalTarea() {
  
  const {modalAbierto, datosTarea, cerrarModalTarea} = useContext(ModalContext);

  const {token, tokenValido, verificarToken} = useContext(TokenContext);

  const { actualizarTareas, etiquetas, getEtiquetas} = useContext(MainContext);

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

  useEffect(()=>{
    console.log("ModalTarea.js ha recibido modalAbierto con el valor: ", modalAbierto);
    console.log("ModalTarea.js ha recibido datosTarea con el valor: ", datosTarea);
  },[modalAbierto, datosTarea])

  const crearTarea = async (e) => {
    console.log("crearTarea se ha ejecutado");
    e.preventDefault();
    try{
      await verificarToken();
      if(tokenValido === true){
        console.log("crearTarea() dice que el token es: ", token);
        if(formData.nombre.length < 5) throw new Error("La tarea debe contener un nombre");
        else{
          //Obtiene el id de usuario
          axios.post("http://localhost:3001/usuarios/obtenerId", {token})
          .then((usuarioRes)=>{
            const nuevoId = usuarioRes.data.result[0].id_usuario;
            const nuevoformData = {...formData, idUsuario: nuevoId};
            //Crea la tarea añadiendole ademas de los datos introducidos, el idUsuario
            axios.post("http://localhost:3001/tareas/crear", nuevoformData)
            .then((tareaRes)=>{
              console.log("tareaRes: ", tareaRes);
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
          }).catch((err)=> console.log("Hubo un error al consultar usuarios/obtenerId"))
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
