import React from 'react';
import './boxlab.css';

interface BoxlabProps {
    labName: string;
    imgsrc: string;
    links: { text: string; url: string }[];
  }

const Boxlab: React.FC<BoxlabProps> = ({labName, imgsrc, links}) => {
  return (
    <div className={`boxLabBorder`}>
        <h1 className={`labTitle`}>{labName}</h1>
        <img src={imgsrc} alt={labName}/>
        <div className={`linkContainer`}>
            {links.map((link, index) => (
                <div className={index === links.length -1 ? 'links' : `links linkBorder`}>
                  <a key={index} href={link.url}>{link.text}</a> 
                </div>
            ))} 
        </div> 
    </div>
  );
};

export default Boxlab; 