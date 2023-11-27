import React, { useState } from "react";
import { Card as BootstrapCard, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

function Card({ stepTitle, stepSummary, illustration, tooltipText, readMoreText, actionableItems, onPrevious, onNext}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const buttonStyle = { 
        margin: "10px",
        backgroundColor: '#F1D3B3', 
        color: '#65647C',
        border: 'none',
        boxShadow: '0px 4px 8px 3px rgba(0, 0, 0, 0.6)', 
    };

    return (
        <div className="card-container" style={{ boxShadow: "0px 4px 8px 4px rgba(0, 0, 0, 0.8)" }}>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{stepTitle}</h5>
                    <p className="card-text">{stepSummary}</p>
                    <OverlayTrigger overlay={<Tooltip>{tooltipText}</Tooltip>}>
                        <Button variant="info">i</Button>
                    </OverlayTrigger>
                    <Button className="custom-button" onClick={() => setIsExpanded(!isExpanded)} style={buttonStyle}>{readMoreText}</Button>
                    {isExpanded && actionableItems}
                    <Button className="custom-button" onClick={onPrevious} style={buttonStyle}>Anterior</Button>
                    <Button className="custom-button" onClick={onNext} style={buttonStyle}>Siguiente</Button>
                </div>
            </div>
        </div>
    );
}

export default Card;