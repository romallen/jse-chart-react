import React from "react";
import "./style.css";
import HChart from "./component/chart"
import Footer from "./component/footer";

export default function App() {
  return (
    <div className="chart-container">
      <h1 className="heading">JAMAICA STOCK EXCHANGE CHARTS</h1>
      <HChart/>
      <Footer/>
    </div>
  );
}
