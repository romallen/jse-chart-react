import React from "react";
import gitIMG from "../images/github.svg";
import linkedinIMG from "../images/linkedin.svg";
import { Header, Box, Button, Anchor, Text, Image, Footer } from "grommet";

export default function Foooter() {
  return (
    <Footer justify="center">
      <Anchor href="https://github.com/romallen">
      <Box height="xxsmall" width="xxsmall">
        <Image src={gitIMG} />
        </Box>
      </Anchor>
      <Anchor href="https://www.linkedin.com/in/romaine-allen">
      <Box height="xxsmall" width="xxsmall">
        <Image src={linkedinIMG} />
        </Box>
      </Anchor>
    </Footer>

  );
}
