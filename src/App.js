import React, { useState } from 'react'; 
import logoFC from './images/logoFC_2.png';
import './styles/App.css'; // Import the styles

import NavigationBar from './NavigationBar';
import GraphContainer from './GraphContainer';
import ImageContainer from './ImageContainer';
import Header from './Header';
import Card from './Card';

import { BrowserRouter as Router } from "react-router-dom";
import { Form, Row, Col } from 'react-bootstrap';

// Main App component
function App() {
  const [x, setX] = useState(0);
  const [objectDistance, setObjectDistance] = useState(0); // [1
  const [isMoving, setIsMoving] = useState(false);
  const [imageDistance, setImageDistance] = useState(0);
  const [magnification, setMagnification] = useState(1);
  const [focalLength, setFocalLength] = useState(300);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  const cards = [
    {
      stepTitle: "Paso 1: Preparar el Montaje",
      stepSummary: "Coloca la montura con la lente en el punto de referencia sobre el riel óptico.",
      tooltipText: "Asegúrate de que la lente esté limpia y correctamente alineada en el eje óptico.",
      readMoreText: "Leer Más",
      actionableItems: (
        <Form>
          <Form.Label>Datos...</Form.Label>
          <Form.Control type="number" placeholder="Datos" />
        </Form>
      ),
    },
    {
      stepTitle: "Paso 2: Alineación de la Fuente de Luz",
      stepSummary: "Alinea la fuente de luz con la lente y ajusta la pantalla para obtener un punto focal nítido.",
      tooltipText: "La fuente de luz debe estar bien alineada para garantizar la precisión en la medición del foco.",
      readMoreText: "Leer Más",
      actionableItems: (
        <Form>
          <Form.Label>Datos...</Form.Label>
          <Form.Control type="number" placeholder="Datos" />
        </Form>
      ),
    },
    {
      stepTitle: "Paso 3: Medición de Distancias",
      stepSummary: "Mide la distancia entre la lente y la pantalla para diferentes posiciones del objeto iluminado.",
      tooltipText: "Toma nota de todas las mediciones para calcular la distancia focal más adelante.",
      readMoreText: "Leer Más",
      actionableItems: (
        <Form>
          <Form.Label>Datos...</Form.Label>
          <Form.Control type="number" placeholder="Datos" />
        </Form>
      ),
    },
    {
      stepTitle: "Paso 4: Cálculo de la Distancia Focal",
      stepSummary: "Utiliza las mediciones para calcular la distancia focal de la lente mediante la fórmula del fabricante.",
      tooltipText: "Aplica la fórmula 1/f = 1/di + 1/do para encontrar la distancia focal.",
      readMoreText: "Leer Más",
      actionableItems: (
        <Form>
          <Form.Label>Datos...</Form.Label>
          <Form.Control type="number" placeholder="Datos" />
        </Form>
      ),
    },
    {
      stepTitle: "Paso 5: Verificación y Análisis",
      stepSummary: "Compara tus cálculos con los valores teóricos para verificar la precisión de tus mediciones.",
      tooltipText: "Analiza posibles errores o desviaciones en tus resultados.",
      readMoreText: "Leer Más",
      actionableItems: (
        <Form>
          <Form.Label>Datos...</Form.Label>
          <Form.Control type="number" placeholder="Datos" />
        </Form>
      ),
    },
    // ... otros pasos según sean necesarios ...
  ];

  const handleObjectDistanceChange = (event) => {
    const newObjectDistance = event.target.value;
    setObjectDistance(newObjectDistance);
    setX(window.innerWidth / 2 - newObjectDistance); // Update the x position based on the new object distance
  };
  
  const handleFocalLengthChange = (event) => {
    setFocalLength(event.target.value);
  };

  const handleFocalLengthKeyPress = (event) => {
    if (event.key === 'Enter') {
      setX(150); // Reset the x position
    }
  };

  const handleMouseMove = (event) => {
    if (isMoving) {
      setX(event.clientX);
      let objectDistanceForCalculations = window.innerWidth / 2 - event.clientX;
      if (objectDistanceForCalculations < -focalLength) {
        objectDistanceForCalculations = -focalLength;
      } else if (objectDistanceForCalculations > focalLength) {
        objectDistanceForCalculations = focalLength;
      }
      calculateImageDistance(objectDistanceForCalculations);
    }
  };

  const calculateImageDistance = (objectDistance) => {
    const imageDistance = 1 / ((1 / focalLength) - (1 / objectDistance));
    if (imageDistance <= 3500) {
      setImageDistance(imageDistance);
      calculateMagnification(objectDistance, imageDistance);
    }
  };

  const calculateMagnification = (objectDistance, imageDistance) => {
    const magnification = -imageDistance / objectDistance;
    setMagnification(magnification);
  };

  const handleImageClick = (event) => {
    event.stopPropagation(); // Prevent the event from bubbling up to the App component
    setIsMoving(true);
  };

  const handleAppClick = () => {
    if (isMoving) {
      setIsMoving(false);
    }
  };

  const handleNext = () => {
    if (selectedCardIndex < cards.length - 1) {
      setSelectedCardIndex(selectedCardIndex + 1);
    }
  }

  const handlePrevious = () => {
    if (selectedCardIndex > 0) {
      setSelectedCardIndex(selectedCardIndex - 1);
    }
  }

  const originalHeight = 100; // Set this to the original height of the image

  return (
    <Router>
      <div className="App" onMouseMove={handleMouseMove} onClick={handleAppClick}>
        <Header focalLength={focalLength} handleFocalLengthChange={handleFocalLengthChange} handleFocalLengthKeyPress={handleFocalLengthKeyPress} objectDistance={objectDistance} handleObjectDistanceChange={handleObjectDistanceChange} />
        <ImageContainer x={x} handleImageClick={handleImageClick} imageDistance={imageDistance} focalPoint={focalLength} objectDistance={objectDistance}/>
        <div className="graph-and-logo-container">  
          <Row>
            <Col sm={12} md={6} className='h-100'>
              <GraphContainer objectDistance={objectDistance} imageDistance={imageDistance} />
            </Col>
            <Col sm={12} md={6} className='h-100'>
              <Card {...cards[selectedCardIndex]} onPrevious={handlePrevious} onNext={handleNext} />
            </Col>
          </Row>
        </div>  
      </div>
    </Router>
  );
}

export default App;