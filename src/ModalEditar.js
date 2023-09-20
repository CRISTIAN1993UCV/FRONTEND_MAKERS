import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function ModalEditar(props) {
  const { mostrarPopup, datosEditados, handleCerrarPopup, handleGuardarCambios } = props;

  // Función para guardar los cambios en los datos
  const handleGuardarCambiosLocal = () => {
    // Llamar a la función en App.js para guardar los cambios
    handleGuardarCambios();
  };

  return (
    <Modal show={mostrarPopup} onHide={handleCerrarPopup}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Datos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="firstname">
            <Form.Label>Primer Nombre</Form.Label>
            <Form.Control
              type="text"
              value={datosEditados.firstname}
              onChange={(e) =>
                props.setDatosEditados({
                  ...datosEditados,
                  firstname: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="lastname">
            <Form.Label>Segundo Nombre</Form.Label>
            <Form.Control
              type="text"
              value={datosEditados.lastname}
              onChange={(e) =>
                props.setDatosEditados({
                  ...datosEditados,
                  lastname: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={datosEditados.email}
              onChange={(e) =>
                props.setDatosEditados({
                  ...datosEditados,
                  email: e.target.value,
                })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCerrarPopup}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleGuardarCambiosLocal}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditar;
