import React from "react";

import NavigationBar from './NavigationBar';
import './styles/Header.css';

import { Form, Row, Col } from 'react-bootstrap';

function Header({ focalLength, handleFocalLengthChange, handleFocalLengthKeyPress, objectDistance, handleObjectDistanceChange }) {
    return (
      <>
        <NavigationBar />
        <div className="FocalLengthInput">
          <Row> 
            <Col>
              <div className="form-group">
                <Form.Label htmlFor="focalLength" className="text-center">Longitud Focal</Form.Label>
                <Form.Control type="number" id="focalLength" value={focalLength} onChange={handleFocalLengthChange} onKeyPress={handleFocalLengthKeyPress} />
              </div>
            </Col>
            <Col>
              <div className="form-group">  
                <Form.Label htmlFor="objectDistance" className="text-center">Distancia Objeto</Form.Label>
                <Form.Control type="number" id="objectDistance" value={objectDistance} onChange={handleObjectDistanceChange} />
              </div>
            </Col> 
          </Row>
          <div className="text-center p-3 text-dark mb-1">Arrastra el objeto para observar como cambia la distancia de la imagen</div>
        </div>
      </>
    );
  }

export default Header;