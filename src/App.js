import React, { useState } from 'react'; 
import logoFC from './images/logoFC_2.png';
import './styles/App.css'; // Import the styles

import NavigationBar from './NavigationBar';
import GraphContainer from './GraphContainer';
import ImageContainer from './ImageContainer';
import Header from './Header';

import { BrowserRouter as Router } from "react-router-dom";

// Main App component
function App() {
  const [x, setX] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [imageDistance, setImageDistance] = useState(0);
  const [magnification, setMagnification] = useState(1);
  const [focalLength, setFocalLength] = useState(300);

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

  const originalHeight = 100; // Set this to the original height of the image
  // Calculate object distance
  const objectDistance = window.innerWidth / 2 - x;

  return (
    <Router>
      <div className="App" onMouseMove={handleMouseMove} onClick={handleAppClick}>
        <Header focalLength={focalLength} handleFocalLengthChange={handleFocalLengthChange} handleFocalLengthKeyPress={handleFocalLengthKeyPress} />
        <ImageContainer x={x} handleImageClick={handleImageClick} imageDistance={imageDistance} focalPoint={focalLength}/>
        <div className="horizontal-line"></div>
        <div className="graph-and-logo-container">
          <GraphContainer objectDistance={objectDistance} imageDistance={imageDistance} />
          {/* ... */}
        </div>
      </div>
    </Router>
  );
}

export default App;