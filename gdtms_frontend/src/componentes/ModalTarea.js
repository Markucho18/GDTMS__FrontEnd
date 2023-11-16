import {Contexto} from '../Contexto';
import { useState, useContext } from "react";
import axios from "axios";
import { tareas } from '../datosSimulados/tareas';

export function ModalTarea({ cerrarModalTarea }) {

  const {token, setToken, tokenValido, setTokenValido, verificarToken} = useContext(Contexto)

  const [modalData, setModalData] = useState({
    nombre: "",
    fecha: "",
    prioridad: "",
    idEtiqueta: "",
    descripcion: "",
    usuario: token.username,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData({
      ...modalData,
      [name]: value,
    });
  };

  const crearTarea = async () => {
    try{
      await verificarToken();
      if(tokenValido == true){
        const obtenerUsuario = await axios.get(`http://localhost:3001/usuarios/obtener?usuario=${modalData.usuario}`);
        console.log(obtenerUsuario.data);
/*         const tareaResp = await axios.post("http://localhost:3001/tareas/crear", modalData);
        console.log(tareaResp.data); */
      }
      else throw new Error("El token es invalido")
    }
    catch(err){
      console.log("Hubo un error al crear la tarea: ", err)
    }
  };

  const [etiquetas, setEtiquetas] = useState();
  const getEtiquetas = async () => {
    const etiquetasRes = await axios.get("http://localhost:3001/etiquetas");
    setEtiquetas(etiquetasRes.data);
  };

  return (
    <div className="fondoModal cen col">
      <form onSubmit={crearTarea} className="contenedorModal cen col">
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
            onClick={getEtiquetas}
            name="etiqueta"
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
            <option>Ninguna</option>
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
            className="btn" /* onClick={cerrarModalTarea} */
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
