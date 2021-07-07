import React from 'react';
import { Link } from 'react-router-dom';

const ActivityCard = ({activity}) => {
    return (
        
        <div className="column">
			<h4>Name: {activity.name}</h4>
            <p className="stock">Duration: {activity.duration}</p>		
            <p className="stock">Difficulty: {activity.difficulty}</p>		
            <p className="stock">Season: {activity.season}</p>		

        </div>          
              
    )
}

export default ActivityCard