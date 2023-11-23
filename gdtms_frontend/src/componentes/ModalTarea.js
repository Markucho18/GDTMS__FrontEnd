import {Contexto} from '../Contexto';
import { useState, useContext, useEffect} from "react";
import axios from "axios";

export function ModalTarea({ cerrarModalTarea, accion}) {

  const {token, tokenValido, verificarToken, setActualizarMain, datosTarea} = useContext(Contexto)

  const [modalData, setModalData] = useState({
    nombre: "",
    fecha: "",
    prioridad: 0,
    idEtiqueta: 0,
    descripcion: null,
  });

  useEffect(()=>{
    getEtiquetas();
  },[])

  useEffect(()=>{
    if(accion === "editar"){
      setModalData((prevData)=>({
        ...prevData,
        nombre: datosTarea.nombre,
        fecha: datosTarea.fecha,
        prioridad: datosTarea.prioridad,
        idEtiqueta: datosTarea.idEtiqueta,
        descripcion: datosTarea.descripcion,
        idTarea: datosTarea.idTarea
      }))
    }
  },[accion, datosTarea])


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    //Convetir a numero si le llega el valor de prioridad o idEtiqueta
    const intValue = name === "prioridad" || name === "idEtiqueta" ? parseInt(value) : value;
    setModalData({
      ...modalData,
      [name]: intValue,
    });
  };

  const crearTarea = async (e) => {
    e.preventDefault();
    try{
      await verificarToken();
      if(tokenValido === true){
        console.log("crearTarea() dice que el token es: ", token);
        if(modalData.nombre.length < 5) throw new Error("La tarea debe contener un nombre");
        const obtenerUsuario = await axios.post("http://localhost:3001/usuarios/obtener", {token} );
        const nuevoId = obtenerUsuario.data.result[0].id_usuario;
        const nuevoModalData = {...modalData, idUsuario: nuevoId};
        const tareaResponse = await axios.post("http://localhost:3001/tareas/crear", nuevoModalData);
        console.log(tareaResponse);
        alert("Tarea creada correctamente");
        setModalData({
          nombre: "",
          fecha: "",
          prioridad: "",
          idEtiqueta: "",
          descripcion: ""
        })
        setActualizarMain(true);
        cerrarModalTarea();
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
      const editarResponse = await axios.put("http://localhost:3001/tareas", modalData);
      alert("Tarea Editada correctamente");
      setModalData({
        nombre: "",
        fecha: "",
        prioridad: "",
        idEtiqueta: "",
        descripcion: "",
        idTarea: ""
      })
      setActualizarMain(true);
      cerrarModalTarea();
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
      <form onSubmit={accion === "editar" ? editarTarea : crearTarea} className="contenedorModal cen col">
        <label className="row">
          Nombre:
          <input
            type="text"
            className="modalNombre"
            name="nombre"
            value={modalData.nombre}
            onChange={handleInputChange}
          />
        </label>
        <label className="row">
          Fecha:
          <input
            type="date"
            className="modalFecha"
            name="fecha"
            value={modalData.fecha}
            onChange={handleInputChange}
          />
        </label>
        <label className="row">
          Prioridad:
          <select
            name="prioridad"
            value={modalData.prioridad}
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
            name="idEtiqueta"
            value={modalData.idEtiqueta}
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
            value={modalData.descripcion}
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
            {accion === "editar" ? "Editar" : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
