import React from "react";

import { Scatter } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import { LinearScale } from 'chart.js/auto';

Chart.register(LinearScale);

function GraphContainer({ objectDistance, imageDistance }) {
    return (
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
                  // ...
                }
              }
            }
          }}
        />
      </div>
    );
  }

export default GraphContainer;