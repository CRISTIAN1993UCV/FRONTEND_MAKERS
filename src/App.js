import React, { useState,useEffect } from 'react';
import Tabla from './Tabla';
import ModalEditar from './ModalEditar';
import Formulario from './Formulario';
import axios from 'axios';

function App() {
  const [datos, setDatos] = useState([]); // Tu arreglo de datos inicial
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [datosEditados, setDatosEditados] = useState({
    firstname: '',
    lastname: '',
    email: '',
  });
  const [indiceEditado, setIndiceEditado] = useState(null);

  useEffect(() => {
    // Realizar una solicitud GET para obtener todos los estudiantes cuando el componente se monta
    axios.get('http://localhost:9090/api/students')
      .then(response => {
        // Extraer los estudiantes del objeto _embedded
        const estudiantes = response.data._embedded.students;
        setDatos(estudiantes);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }, []);
  

  // Función para abrir el formulario de edición
  const handleEditar = (index) => {
    const filaSeleccionada = datos[index];
    setDatosEditados(filaSeleccionada);
    setIndiceEditado(index);
    setMostrarPopup(true);
  };

  // Función para cerrar el formulario de edición
  const handleCerrarPopup = () => {
    setMostrarPopup(false);
    setDatosEditados({ // Limpia los datos editados
      firstname: '',
      lastname: '',
      email: '',
    });
    setIndiceEditado(null);
  };

  // Función para guardar los cambios en los datos
  const handleGuardarCambios = () => {
    if (indiceEditado !== null) {
      const estudianteEditado = datos[indiceEditado];
      // Realizar una solicitud PUT para actualizar el estudiante
      axios.put(`http://localhost:9090/api/students/${estudianteEditado.id}`, datosEditados)
        .then(response => {
          const nuevosDatos = [...datos];
          nuevosDatos[indiceEditado] = response.data._embedded;
          setDatos(nuevosDatos);
          setMostrarPopup(false);
        })
        .catch(error => {
          console.error('Error al guardar cambios:', error);
        });
    }
  };

  const agregarDatos = (nuevoDato) => {
    // Realizar una solicitud POST para crear un nuevo estudiante
    axios.post('http://localhost:9090/api/students', nuevoDato)
      .then(response => {
        setDatos([...datos, response.data._embedded]);
      })
      .catch(error => {
        console.error('Error al agregar datos:', error);
      });
  };
  const eliminarEstudiante = (estudianteId) => {
    const nuevosDatos = datos.filter((estudiante) => estudiante.id !== estudianteId);
    setDatos(nuevosDatos);
  };

  return (
    <div className="App">
      <Formulario agregarDatos={agregarDatos} />
      <Tabla datos={datos} handleEditar={handleEditar} eliminarEstudiante={eliminarEstudiante} />
      {mostrarPopup && (
        <ModalEditar
         mostrarPopup={mostrarPopup}
         datosEditados={datosEditados}
         handleCerrarPopup={handleCerrarPopup}
         handleGuardarCambios={handleGuardarCambios}
         
         setDatosEditados={setDatosEditados} // Asegúrate de pasar setDatosEditados aquí
/>

      )}
    </div>
  );
}

export default App;
