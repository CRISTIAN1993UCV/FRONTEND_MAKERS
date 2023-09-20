import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Formulario(props) {
  const { agregarDatos } = props;
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Crear un objeto con los datos del formulario
    const nuevoDato = { firstname, lastname, email };
    // Llamar a la función para agregar los datos al estado
    agregarDatos(nuevoDato);
    // Limpiar el formulario después de agregar los datos
    setfirstname('');
    setlastname('');
    setEmail('');
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="card" style={{ width: '900px' }}>
        <h5 className="card-header" style={{ textAlign: 'left' }}>Crear a un Maker</h5>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 d-flex">
              <input
                type="text"
                value={firstname}
                onChange={(e) => setfirstname(e.target.value)}
                className="form-control"
                placeholder="Primer Nombre"
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid gray',
                  padding: '5px',
                  flex: 1,
                  marginRight: '3px',
                  marginBottom: '3px', // Agregado para separación vertical
                  marginTop: '3px', // Agregado para separación vertical
                }}
              />
              <input
                type="text"
                value={lastname}
                onChange={(e) => setlastname(e.target.value)}
                className="form-control"
                placeholder="Segundo Nombre"
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid gray',
                  padding: '5px',
                  flex: 1,
                  marginRight: '3px',
                  marginBottom: '3px', // Agregado para separación vertical
                  marginTop: '3px', // Agregado para separación vertical
                }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Email"
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid gray',
                  padding: '5px',
                  flex: 1,
                  marginBottom: '3px', // Agregado para separación vertical
                  marginTop: '3px', // Agregado para separación vertical
                }}
              />
              <Button
                type="submit"
                variant="primary"
                style={{
                  marginLeft: '3px',
                  marginTop: '3px', // Agregado para separación vertical
                }}
              >
                Enviar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Formulario;
