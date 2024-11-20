import React from 'react';
import Boxlab from './labselection/components/boxlab';
import './labselection/components/boxlab.css'


const Mainpage: React.FC = () => {
    const labs = [
        {
            labName: 'Frank Hertz Lab',
            imgsrc: 'http://remotelabs.physics.ucsb.edu/static/images/FH-clear.png',
            links: [
                {
                    text: 'Franck 1',
                    url: 'http://remotelabs.physics.ucsb.edu/franck1/', 
                },
                {
                    text: 'Franck 2',
                    url: 'http://remotelabs.physics.ucsb.edu/franck2/', 
                },
            ],

        },
        {
            labName: 'Atomic Spectroscopy',
            imgsrc: 'http://remotelabs.physics.ucsb.edu/static/images/AtomicIcon.png',
            links: [
                {
                    text: 'Atomic 1',
                    url: 'http://remotelabs.physics.ucsb.edu/atomic1/', 
                },
                {
                    text: 'Atomic 2',
                    url: 'http://remotelabs.physics.ucsb.edu/atomic2/', 
                },
            ],

        },
    ]
  return (
    <div className={`labContainer`}>
      {
        labs.map((lab, index) => (
            <Boxlab key={index} labName={lab.labName} imgsrc={lab.imgsrc} links={lab.links} />
        ))
      }
    </div>
  );
};

export default Mainpage; 