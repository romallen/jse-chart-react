import React from "react";
import "./style.css";
import HChart from "./component/chart"
import Foooter from "./component/footer";
import Navbar from "./component/navbar";
import { Grommet,Heading, Box } from 'grommet';
export default function App() {
  const theme = {
    global: {
      margin:"none",
      font: {
        family: 'Roboto',
        size: '14px',
        width: '100%'
        // height: '20px',
      },
      colors: {
        //brand: '#0099ff',
           },
    },
    header:{
      //background: '#0099ff',
    },
    tab: {
      color: "black",
      border: {
        side: "bottom",
        size: "small",
        color: {
          dark: "accent-1",
          light: "green",
        },
        active: {
          color: {
            dark: "white",
            light: "black",
          },
        },
        hover: {
          color: {
            dark: "white",
            light: "black",
          },
          // extend: undefined,
        },
      }
    }
    
  };
  
  return (
    <Grommet theme={theme}>
      <Navbar/>
      <Box margin={"none"} background="Neutral" pad={"none"} gap={"none"}>
        
        <Heading size="small" margin={"none"} pad="none" alignSelf="center">JAMAICA STOCK EXCHANGE CHARTS</Heading>
        <HChart/>
        <Foooter/>
      </Box>
  
    </Grommet>

  );
}
