import {Contexto} from '../Contexto';
import { useState, useContext, useEffect} from "react";
import { useFormData } from '../hooks/useFormData';
import {useToken} from '../hooks/useToken';
import {useModal} from '../hooks/useModal';
import axios from "axios";

export function ModalTarea() {

  const {formData, setFormData, handleInputChange} = useFormData({
    nombre: "",
    fecha: "",
    prioridad: 0,
    idEtiqueta: 0,
    descripcion: null,
  });

  //TANTO LA ACCION COMO EL CERRAR EL MODAL SE ACCEDE DESDE USEMODAL

  const {modalAbierto, setModalAbierto, handleModalTarea} = useModal()

  /* const  {token, tokenValido, verificarToken} = useToken(); */

//IMPORTAR LOGICA DE TOKEN Y MODALES RESPECTIVAMENTE.
  const {token, tokenValido, verificarToken, setActualizarMain, datosTarea} = useContext(Contexto)

  useEffect(()=>{
    getEtiquetas();
  },[])

  //METODO
  useEffect(()=>{
    if(modalAbierto.accion === "editar"){
      setFormData((prevData)=>({
        ...prevData,
        nombre: datosTarea.nombre,
        fecha: datosTarea.fecha,
        prioridad: datosTarea.prioridad,
        idEtiqueta: datosTarea.idEtiqueta,
        descripcion: datosTarea.descripcion,
        idTarea: datosTarea.idTarea
      }))
    }
  },[modalAbierto.accion , datosTarea])

  const crearTarea = async (e) => {
    e.preventDefault();
    try{
      await verificarToken();
      if(tokenValido === true){
        console.log("crearTarea() dice que el token es: ", token);
        if(formData.nombre.length < 5) throw new Error("La tarea debe contener un nombre");
        const obtenerUsuario = await axios.post("http://localhost:3001/usuarios/obtener", {token} );
        const nuevoId = obtenerUsuario.data.result[0].id_usuario;
        const nuevoformData = {...formData, idUsuario: nuevoId};
        const tareaResponse = await axios.post("http://localhost:3001/tareas/crear", nuevoformData);
        console.log(tareaResponse);
        alert("Tarea creada correctamente");
        setFormData({
          nombre: "",
          fecha: "",
          prioridad: "",
          idEtiqueta: "",
          descripcion: ""
        })
        setActualizarMain(true);
        handleModalTarea();
      }
      else throw new Error("El token es invalido")
    }
    catch(err){
      alert(err);
      console.log("Hubo un error al crear la tarea: ", err);
    }
  };

  const editarTarea = async (e) =>{
    e.preventDefault();
    try{
      const editarResponse = await axios.put("http://localhost:3001/tareas", formData);
      alert("Tarea Editada correctamente");
      setFormData({
        nombre: "",
        fecha: "",
        prioridad: "",
        idEtiqueta: "",
        descripcion: "",
        idTarea: ""
      })
      setActualizarMain(true);
      handleModalTarea();
    }
    catch(err){
      console.log("Hubo un error al editar la tarea", err);
    }
  }

  const [etiquetas, setEtiquetas] = useState();
  const getEtiquetas = async () => {
    const etiquetasRes = await axios.get("http://localhost:3001/etiquetas");
    setEtiquetas(etiquetasRes.data);
  };

  return (
    <div className="fondoModal cen col">
      <form onSubmit={modalAbierto.accion === "editar" ? editarTarea : crearTarea} className="contenedorModal cen col">
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
            <option value={null}>Ninguna</option>
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
          <button className="btn" onClick={handleModalTarea}>
            Cancelar
          </button>
          <button
            type="submit"
            className="btn"
          >
            {modalAbierto.accion === "editar" ? "Editar" : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
