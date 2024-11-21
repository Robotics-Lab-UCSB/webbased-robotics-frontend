// import React from "react";

// const App = () => {
//     return (
//         <div>

//         </div>  
//     )
// }

// export default App


import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect} from "react";
import './index.css'

const MainPage: React.FC = () => {
    const current_theme = localStorage.getItem('current_theme');
    const [theme, setTheme] = useState(current_theme? current_theme : 'light' );

    useEffect(() => {
        localStorage.setItem('current_theme', theme)
    },[theme])

    // make a good landing page LMAO HEHE HAHA !   
    return (
        <div className = {`container ${theme}`}>
            <Navbar theme = {theme} setTheme = {setTheme}/>
        </div>
    );
};

export default MainPage;
