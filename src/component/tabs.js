import React, { useState, useEffect } from "react";
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
} from "grommet";

export default function DataTabs(props) {
  const [financials, setFinancials] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    try {
      let n = [];
      props.news.forEach((element, index) => {
        n.push(
          <Anchor
            key={index}
            href={`https://www.jamstockex.com/${element["slug"]}`}
            label={element["title"]}
            color={"black"}
          ></Anchor>
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
          <Anchor
            key={index}
            href={`https://mymoneyja.com/reports/${element["filename"]}`}
            label={element["display_name"]}
            color={"black"}
          ></Anchor>
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
        <Box pad="medium">{props.blurb}</Box>
      </Tab>
      <Tab title="Financials" color={"black"}>
        <Box pad="medium">{financials}</Box>
      </Tab>
      <Tab title="News" color={"black"}>
        <Box pad="medium">{news}</Box>
      </Tab>
      <Tab title="Corporate Actions">
        <Box pad="medium">Coming Soon</Box>
      </Tab>
    </Tabs>
  );
}
