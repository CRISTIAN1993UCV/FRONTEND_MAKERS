import Button from 'react-bootstrap/Button';
import './App.css'; // Importa tus estilos CSS
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'; // Importa el componente Modal
import axios from 'axios'; // Importa Axios para realizar solicitudes HTTP

function Tabla(props) {
  const { datos, handleEditar,eliminarEstudiante } = props;
  const [mostrarModal, setMostrarModal] = useState(false); // Estado para mostrar/ocultar el modal
  const [idEliminar, setIdEliminar] = useState(null); // Estado para almacenar el ID del estudiante a eliminar

  const handleEliminarClick = (id) => {
    setIdEliminar(id); // Almacena el ID del estudiante que se eliminará
    setMostrarModal(true); // Abre el modal al hacer clic en "Eliminar"
  };



  const handleCancelarEliminar = () => {
    setIdEliminar(null); // Restablece el ID a null
    setMostrarModal(false); // Cierra el modal si el usuario cancela
  };
  const handleConfirmarEliminar = async () => {
    try {
      await axios.delete(`http://localhost:9090/api/students/${idEliminar}`);
      eliminarEstudiante(idEliminar); // Llama a la función para actualizar la lista en App.js
      setMostrarModal(false);
    } catch (error) {
      console.error('Error al eliminar el estudiante:', error);
    }
  };

  return (
    <div className='container'>
      <table className="table table-striped">
        <thead className="bg-light">
          <tr>
            <th>Primer Nombre</th>
            <th>Segundo Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'fila-fuerte' : 'fila-palida'}>
              <td>{item.firstname}</td>
              <td>{item.lastname}</td>
              <td>{item.email}</td>
              <td>
              <Button variant="danger" onClick={() => handleEliminarClick(item.id)}>
                  Eliminar
                </Button>
                <Button variant="info" style={{ marginLeft: '5px' }} onClick={() => handleEditar(index)}>
                  Editar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

        {/* Modal de Confirmación */}
        <Modal show={mostrarModal} onHide={handleCancelarEliminar}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de querer eliminar el registro?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelarEliminar}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmarEliminar}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default Tabla;
