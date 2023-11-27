import React from "react";

function FocalPoint({ position, lensPosition }) {
    return (
        <>
            <div className="focal-point" style={{ left: `${position}px`, backgroundColor: "#F1D3B3" }} />
            <div style={{ left: `${position}px`, position: 'absolute', transform: "translateX(-50%)", color: "#F1D3B3", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>Longitud Focal</div>
        </>
    );
}

export default FocalPoint;