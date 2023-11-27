import React from "react";

import NavigationBar from './NavigationBar';

import { Form } from 'react-bootstrap';

function Header({ focalLength, handleFocalLengthChange, handleFocalLengthKeyPress }) {
    return (
      <>
        <NavigationBar />
        <div className="FocalLengthInput">
          <Form.Label htmlFor="focalLength">Longitud Focal:</Form.Label>
          <Form.Control type="number" id="focalLength" value={focalLength} onChange={handleFocalLengthChange} onKeyPress={handleFocalLengthKeyPress} />
          <div className="text-center p-3 text-dark mb-1">Arrastra el objeto para observar como cambia la distancia de la imagen</div>
        </div>
      </>
    );
  }

export default Header;