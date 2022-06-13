import React from "react";
import "./style.css";
import HChart from "./component/chart";
import Foooter from "./component/footer";
import Navbar from "./component/navbar";
import { Grommet, Heading, Box } from "grommet";
export default function App() {
  const theme = {
    global: {
      font: {
        family: "Montserrat",
        size: "14px",
        width: "100%",
      },
      colors: {
        //brand: '#0099ff',
      },
      // breakpoints: {
      //   small: {
      //     value: 500,
      //     borderSize: {
      //       xsmall: "1px",
      //       small: "2px",
      //       medium: "4px",
      //       large: "6px",
      //       xlarge: "12px"
      //     },
      //     edgeSize: {
      //       none: "0px",
      //       hair: "1px",
      //       xxsmall: "2px",
      //       xsmall: "3px",
      //       small: "6px",
      //       medium: "12px",
      //       large: "24px",
      //       xlarge: "48px"
      //     },
      //     size: {
      //       xxsmall: "24px",
      //       xsmall: "48px",
      //       small: "96px",
      //       medium: "192px",
      //       large: "384px",
      //       xlarge: "768px",
      //       full: "100%"
      //     }
      //   },
      //   medium: { value: 1536 },
      //   large: {}
      // }
    },
    header: {
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
        },
      },
    },
  };

  return (
    <Grommet theme={theme}>
      <Navbar />
      <Box margin={"none"} background="Neutral" pad={"none"} gap={"none"}>
        <Heading size="small" margin={"none"} pad="none" alignSelf="center">
          JAMAICA STOCK EXCHANGE CHARTS
        </Heading>
        <HChart />
        <Foooter />
      </Box>
    </Grommet>
  );
}
