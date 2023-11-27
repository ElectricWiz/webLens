import React from "react";

import logo from './images/logo192.png';

const FixedImage = React.forwardRef(({ x, onClick, className, transform, height }, ref) => {
  return <img ref={ref} className={className} src={logo} alt="Fixed" style={{ left: `${x}px`, top: '50%', transform: transform, height: height }} onClick={onClick} />;
});

export default FixedImage;