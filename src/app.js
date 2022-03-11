import React from "react";
import "./style.css";
import HChart from "./component/chart"
import Footer from "./component/footer";
import Navbar from "./component/navbar";
import { Grommet } from 'grommet';
export default function App() {
  const theme = {
    global: {
      font: {
        family: 'Roboto',
        size: '14px',
        height: '20px',
      },
    },
  };
  
  return (
    <Grommet theme={theme}>
      <Navbar/>
      <h1 className="heading">JAMAICA STOCK EXCHANGE CHARTS</h1>
      <HChart/>
      <Footer/>
      </Grommet>
    // <div className="chart-container">

    // </div>
  );
}
