import React from "react";
import {useRef, useEffect, useState} from 'react';

import FixedImage from './FixedImage';
import Lens from './Lens';
import FocalPoint from './FocalPoint';

import { OverlayTrigger, Tooltip, Container } from "react-bootstrap";

function ImageContainer({ x, handleImageClick, imageDistance, focalPoint }) {
    const originalHeight = 100; // Set this to the original height of the image

    const containerRef = useRef(null);
    const [lensPosition, setLensPosition] = useState(0);

    useEffect(() => {
        const containerWidth = containerRef.current.offsetWidth;
        setLensPosition(containerWidth / 2);
    }, []);

    return (
        <Container fluid className="ImagesAndLensContainer" ref={containerRef}>
            <OverlayTrigger
                placement="top"
                overlay={
                    <Tooltip id="image-tooltip">
                        Haz click y arrastra el objeto para cambiar su distancia
                    </Tooltip>
                }
            >
                <div>
                    <FixedImage x={x} onClick={handleImageClick} className="FixedImage" height={`50px`} />
                </div>
            </OverlayTrigger>
            <OverlayTrigger
                placement="top"
                overlay={
                    <Tooltip id="image-tooltip">
                        Esta seria la imagen formada por la lente
                    </Tooltip>
                }
            >
                <div>
                    <FixedImage x={x === imageDistance ? 150 : Math.abs(imageDistance)} className="ImageAtImageDistance" height={"50px"}/>
                </div>
            </OverlayTrigger>
            <FocalPoint position={lensPosition - focalPoint} lensPosition={lensPosition} />
            <Lens />
        </Container>
    );
  }

export default ImageContainer;