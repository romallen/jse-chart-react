import React from "react";
import { Box, Header, Button , Anchor, Tab, Tabs} from 'grommet';

export default function DataTabs(props) {
  return (

    <Tabs>
    <Tab title="About">
      <Box pad="medium">{props.data}</Box>
    </Tab>
    <Tab title="Corporate Actions">
      <Box pad="medium">Coming Soon</Box>
    </Tab>
    <Tab title="Financials">
      <Box pad="medium">Coming Soon</Box>
    </Tab>
    <Tab title="News">
      <Box pad="medium">Coming Soon</Box>
    </Tab>
  </Tabs>

  );
}
