// import React, { useState } from "react";
// import axios from "axios";
// import { VictoryChart, VictoryLine, VictoryAxis } from "victory";

// const Homepage = ({ setLoginUser }) => {
//   const [prediction, setPrediction] = useState("");
//   const [chartData, setChartData] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/predict", {
//         prediction: prediction,
//       });
//       console.log("Prediction sent to Flask server:", response.data);

//       setChartData(response.data.plot_data);
//     } catch (error) {
//       console.log("Error sending prediction to Flask server:", error);
//     }
//   };

//   const handleChange = (e) => {
//     setPrediction(e.target.value);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="text" value={prediction} onChange={handleChange} />
//         <button type="submit">Predict</button>
//       </form>
//       {chartData && (
//         <VictoryChart>
//           <VictoryLine data={chartData} x="x" y="y" />
//           <VictoryAxis />
//           <VictoryAxis dependentAxis />
//         </VictoryChart>
//       )}
//     </div>
//   );
// };

// export default Homepage;



import React, { useState } from "react";
import axios from "axios";

const Homepage = ({ setLoginUser }) => {
  const [prediction, setPrediction] = useState("");
  const [chartData, setChartData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/predict", {
        prediction: prediction,
      });
      console.log("Prediction sent to Flask server:", response.data);

      setChartData(response.data.plot_data);
    } catch (error) {
      console.log("Error sending prediction to Flask server:", error);
    }
  };

  const handleChange = (e) => {
    setPrediction(e.target.value);
  };

  return (
    <div>
      <h2>STOCK MARKET PREDICTOR</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={prediction} onChange={handleChange} />
        <button type="submit">Predict</button>
      </form>
      {chartData && (
        <img src={`data:image/png;base64,${chartData}`} alt="plot" height="300" width="500" />
      )}
    </div>
  );
};

export default Homepage;
