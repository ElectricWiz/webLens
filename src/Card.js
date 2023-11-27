import React, { useState } from "react";
import { Card as BootstrapCard, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

function Card({ stepTitle, stepSummary, illustration, tooltipText, readMoreText, actionableItems, onPrevious, onNext}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const buttonStyle = { 
        margin: "10px",
        backgroundColor: 'black', 
        color: 'lightseagreen' 
    };

    return (
        <BootstrapCard>
            <BootstrapCard.Body>
                <BootstrapCard.Title>{stepTitle}</BootstrapCard.Title>
                <BootstrapCard.Text>{stepSummary}</BootstrapCard.Text>
{/*                 <BootstrapCard.Img variant="top" src={illustration} /> */}
                <OverlayTrigger overlay={<Tooltip>{tooltipText}</Tooltip>}>
                    <Button variant="info">i</Button>
                </OverlayTrigger>
                <Button onClick={() => setIsExpanded(!isExpanded)} style={buttonStyle}>{readMoreText}</Button>
                {isExpanded && actionableItems}
                <Button onClick={onPrevious} style={buttonStyle}>Anterior</Button>
                <Button onClick={onNext} style={buttonStyle}>Siguiente</Button>
            </BootstrapCard.Body>
        </BootstrapCard>
    );
}

export default Card;