import React from "react";
import "./style.css";
import HChart from "./component/chart"
import Footer from "./component/footer";
import Navbar from "./component/navbar";
export default function App() {
  return (
    <div className="chart-container">
      <Navbar/>
      <h1 className="heading">JAMAICA STOCK EXCHANGE CHARTS</h1>
      <HChart/>
      <Footer/>
    </div>
  );
}
