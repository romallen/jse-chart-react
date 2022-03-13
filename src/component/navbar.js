import React from "react";
import { Header, Button , Anchor, Text} from 'grommet';

export default function Navbar() {
  return (

    <Header background={"#00873D"} pad="medium" border={false}>
      <Anchor href="https://romallen.com">
        <Text>Portfolio</Text>
        </Anchor>
      {/* <Button icon={<Icons.Home />} hoverIndicator /> */}
      {/* <Menu label="account" items={[{ label: 'logout' }]} /> */}
    </Header>

  );
}
