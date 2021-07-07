import React from 'react';
import { Link } from 'react-router-dom';




const Landing = () => {


    return (
        <div>
            
            <div className="welcomeBody">
                <Link to="/home" className="welcomeLink">Enter</Link>     
                <h3 className="welcome">The best place to Learn about Geography</h3>
            </div>
        </div>
    )
}

export default Landing;