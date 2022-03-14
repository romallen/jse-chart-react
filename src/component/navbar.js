import React from "react";
import { Header, Button , Anchor, Text} from 'grommet';

export default function Navbar() {
  return (

    <Header background={"#00a087"} pad="medium" border={false}>
      <Anchor href="https://romallen.com">
        <Text color={"black"} size={"large"}>Portfolio</Text>
        </Anchor>
    </Header>

  );
}
