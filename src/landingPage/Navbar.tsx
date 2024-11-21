// import React from "react";
// import './Navbar.css';
// import search_icon_light from '../assets/search-w.png';
// import search_icon_dark from '../assets/search-b.png';
// import toggle_light from '../assets/night.png';
// import toggle_dark from '../assets/day.png';

// const Navbar: React.FC<{ theme: any, setTheme: any }> = ({ theme, setTheme }) => {

//     // Define navbar items as an array
//     const navbarItems = ["Home", "Labs", "About Us", "Contact", "Blog", "hi", "bi", "b"]; // Add more items as needed

//     const toggle_mode = () => {
//         theme === 'light' ? setTheme('dark') : setTheme('light');
//     };

//     return (
//         <div className="navbar">
//             {/* Left Section (Navbar Items) */}
//             <div className="navbar-left">
//                 <ul>
//                     {navbarItems.map(item => (
//                         <li key={item}>{item}</li>
//                     ))}
//                 </ul>
//             </div>

//             {/* Right Section (Search Box and Toggle Button) */}
//             <div className="search-box">
//                 <input type="text" placeholder="Search" />
//                 <img src={theme === 'light' ? search_icon_light : search_icon_dark} alt="" />
//             </div>

//             {/* Toggle Button */}
//             <img onClick={() => { toggle_mode() }} src={theme === 'light' ? toggle_light : toggle_dark} alt="" className="toggle-icon" />
//         </div>
//     );
// };

// export default Navbar;

import React from "react"
import "./Navbar.css"
import search_icon_light from "../assets/search-w.png"
import search_icon_dark from "../assets/search-b.png"
import toggle_light from "../assets/night.png"
import toggle_dark from "../assets/day.png"

const Navbar: React.FC<{ theme: any; setTheme: any }> = ({
  theme,
  setTheme,
}) => {
  const toggle_mode = () => {
    theme == "light" ? setTheme("dark") : setTheme("light")
  }

  return (
    <div
      className="navbar"
      style={theme === "light" ? { color: "black" } : { color: "light" }}
    >
      <img src="" alt="" className="logo" />
      <ul>
        <li>Home</li>
        <li>Labs</li>
        <li>About Us</li>
      </ul>

      <div className="search-box">
        <input type="text" placeholder="Search" />

        <img
          src={theme == "light" ? search_icon_light : search_icon_dark}
          alt=""
        />
      </div>

      <img
        onClick={() => {
          toggle_mode()
        }}
        src={theme == "light" ? toggle_light : toggle_dark}
        alt=""
        className="toggle-icon"
      />
    </div>
  )
}

export default Navbar
