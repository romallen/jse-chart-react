import React from "react";
import "./style.css";
import HChart from "./component/chart"
import Foooter from "./component/footer";
import Navbar from "./component/navbar";
import { Grommet,Heading, Box } from 'grommet';
export default function App() {
  const theme = {
    global: {
      font: {
        family: 'Roboto',
        size: '14px',
        width: '100%'
        // height: '20px',
      },
      colors: {
             'light-2': '#f5f5f5',
             'text': {
               light: 'rgba(0, 0, 0, 0.87)',
             },
           },
           edgeSize: {
             small: '14px',
           },
           elevation: {
             light: {
               medium: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
             },
           },
    },
  };
  
  return (
    <Grommet theme={theme}>
      <Box margin={"none"} background="Neutral">
        <Navbar/>
        <Heading>JAMAICA STOCK EXCHANGE CHARTS</Heading>
        <HChart/>
        <Foooter/>
      </Box>
  
    </Grommet>

  );
}
