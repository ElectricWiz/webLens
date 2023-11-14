import React, { useState } from 'react';
import logo from './logo192.png'; // Import the image
import lens from './lens.png'; // Import the lens image
import logoFC from './logoFC_2.png';
import './App.css'; // Import the styles

import { Scatter } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import { LinearScale } from 'chart.js/auto';

Chart.register(LinearScale);

// Component for the movable object
const MovableObject = ({ x }) => {
  return <div className="MovableObject" style={{ left: `${x}px` }} />;
};

// Component for the fixed image
const FixedImage = ({ x, onClick, className, transform, height }) => {
  return <img className={className} src={logo} alt="Fixed" style={{ left: `${x}px`, top: '50%', transform: transform, height: height }} onClick={onClick} />;
};

// Component for the lens
const Lens = () => {
  return <img className="Lens" src={lens} alt="Lens" />;
};

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
    <div className="App" onMouseMove={handleMouseMove} onClick={handleAppClick}>
      <div className="ImagesAndLensContainer">
        <div className="FocalLengthInput">
          <label htmlFor="focalLength">Longitud Focal:</label>
          <input type="number" id="focalLength" value={focalLength} onChange={handleFocalLengthChange} onKeyPress={handleFocalLengthKeyPress} />
        </div>
        <FixedImage x={x} onClick={handleImageClick} className="FixedImage" transform="perspective(1000px) rotateY(45deg)" height={`${originalHeight}px`} /> {/* Use FixedImage as the movable object */}
        <FixedImage x={x === imageDistance ? 150 : Math.abs(imageDistance)} className="ImageAtImageDistance" transform={`perspective(1000px) rotateY(-45deg)`} />
        <Lens />
      </div>
      <div className="horizontal-line"></div>
      <div className="graph-and-logo-container">
        <div className="graph-container">
        <Scatter
          data={{
            datasets: [
              {
                label: 'Distances',
                data: [
                  { x: objectDistance, y: imageDistance } // point representing the object and image distances
                ],
                backgroundColor: 'rgb(75, 192, 192)'
              }
            ]
          }}
          options={{
            scales: {
              x: {
                type: 'linear', // specify the type of scale
                title: {
                  display: true,
                  text: 'Object Distance'
                },
                min: -focalLength*3, // minimum value
                max: focalLength, // maximum value
              },
              y: {
                type: 'linear', // specify the type of scale
                title: {
                  display: true,
                  text: 'Image Distance'
                },
                min: -3500, // minimum value
                max: 3500, // maximum value
              }
            }
          }}
        />
         </div>
         <div className="logo-container">
          <img src={logoFC} alt="Facultad de Ciencias UNAM logo" className="logo" />
        </div>
      </div>
    </div>
  );
}

export default App;