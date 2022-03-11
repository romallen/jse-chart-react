import React from "react";
import { Header, Button , Anchor, Text} from 'grommet';

export default function Navbar() {
  return (

    <Header >
      <Anchor href="https://romallen.com" label="Portfolio" />
      {/* <Button icon={<Icons.Home />} hoverIndicator /> */}
      {/* <Menu label="account" items={[{ label: 'logout' }]} /> */}
    </Header>

  );
}
