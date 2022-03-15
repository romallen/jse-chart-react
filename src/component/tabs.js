import React, { useState, useEffect, useContext} from "react";
import {
  Box,
  Card,
  Header,
  Button,
  List,
  Anchor,
  Tab,
  Tabs,
  Text,
  Paragraph,
} from "grommet";
import { isBrowser, isMobile } from "react-device-detect";

export default function DataTabs(props) {
  const [financials, setFinancials] = useState([]);
  const [news, setNews] = useState([]);
  let textSize
  let sizeCheck = () => {
  if (isMobile) {
    textSize= "1.5";
  } else {
    textSize="1";
  }
}
sizeCheck();
  useEffect(() => {
    try {
      let n = [];
      props.news.forEach((element, index) => {
        n.push(
          <Box  key={index} pad={"small"}>
          <Anchor
           
            pad="small"
            size={textSize+"em"}
            href={`https://www.jamstockex.com/${element["slug"]}`}
            label={element["title"]}
            color={"black"}
          ></Anchor>
          </Box>
        );
      });
      setNews(n);
    } catch (error) {}
    console.error();
  }, [props.news]);

  useEffect(() => {
    try {
      let n = [];
      props.financials.forEach((element, index) => {
        n.push(
          <Box  key={index} pad={"small"}>
          <Anchor
           
            pad="small"
            size={textSize+"em"}
            href={`https://mymoneyja.com/reports/${element["filename"]}`}
            label={element["display_name"]}
            color={"black"}
          ></Anchor>
          </Box>
        );
      });
      setFinancials(n);
    } catch (error) {}
    console.error();
  }, [props.financials]);

  //  useEffect(() => {
  //   try {
  //     let f = []
  //     props.news.forEach((element) => {
  //       n.push(<Box>
  //         <Anchor href={`https://www.jamstockex.com/${element["slug"]}`} label= {element["title"]} ></Anchor>
  //       </Box>)
  //     })
  //     setNews(f)
  //   } catch (error) {
  //   }
  //     console.error()

  //  },[props.news])

  return (
    <Tabs color={"black"}>
      <Tab title="About" color={"black"}>
        <Box pad="medium" ><Paragraph size={(textSize * 1.2)+"em"}>{props.blurb}</Paragraph></Box>
      </Tab>
      <Tab title="News" color={"black"}>
        <Box pad="medium">
        {news}
          </Box>
      </Tab>
      <Tab title="Financials" color={"black"}>
        <Box pad="medium">
        {/* {financials}    */}
        Coming Soon
          </Box>
      </Tab>
      <Tab title="Corporate Actions">
        <Box pad="medium">Coming Soon</Box>
      </Tab>
    </Tabs>
  );
}
