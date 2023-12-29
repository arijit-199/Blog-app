import React from 'react';
import Logo from "../images/logo.png";


const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt=''/>
      <span>Made with ❤ and <b>React.js</b></span>
    </footer>
  )
}

export default Footer