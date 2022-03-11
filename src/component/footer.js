import React from "react";
import gitIMG from "../images/github.svg"
import linkedinIMG from "../images/linkedin.svg"
import { Header, Button , Anchor, Text,Image, Footer} from 'grommet';

export default function Foooter() {
  return (
    <Footer justify="center">
     <Anchor href="https://github.com/romallen" >
      <Image src={gitIMG}/>
     </Anchor> 
      <Anchor href="https://www.linkedin.com/in/romaine-allen">
        <Image src={linkedinIMG}/>
      </Anchor>

    </Footer>
    // <div className="footer-container">
    //     <h2 className="footer">Contact</h2>
       
    //     <a  id= "email" className="email-link" href = "mailto: romallen1@gmail.com">romallen1@gmail.com</a>

        
    // </div>
  );
}
