import React from "react";

function FocalPoint({ position, lensPosition }) {
    return (
        <>
            <div className="focal-point" style={{ left: `${position}px` }} />
            <div style={{ left: `${position}px`, position: 'absolute', transform: "translateX(-50%)" }}>Longitud focal</div>
        </>
    );
}

export default FocalPoint;