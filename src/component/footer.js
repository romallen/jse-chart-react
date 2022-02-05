import React from "react";
import gitIMG from "../images/github.svg"
import linkedinIMG from "../images/linkedin.svg"

export default function Footer() {
  return (
    <div className="footer-container">
        <h2 className="footer">Contact</h2>
       
        <a  id= "email" className="email-link" href = "mailto: romallen1@gmail.com">romallen1@gmail.com</a>
       <span>
            <a id="github" className="contact-media" href="https://github.com/romallen">
                <img src= {gitIMG} ></img>
            </a>
            <a id="linkedin" className="contact-media" href="https://www.linkedin.com/in/romaine-allen">
                <img src= {linkedinIMG} ></img>
            </a>
       </span>
        
    </div>
  );
}
