import React from 'react';
import moment from 'moment';

const WorkoutCompareTile = props => {
  let date = moment(props.date).format("ddd MM/DD/YY")


  return(
    <div className='workout-compare-card'>
      <div className='workout-compare-card__date'>
        <h4>{date}</h4>
      </div>
      <div className="workout-compare-card__distance">
        <h1 id="distance">{props.distance}</h1>
        <p>Miles</p>
      </div>

    </div>
  )
}

export default WorkoutCompareTile;


// <h7>Time:</h7>
// <p id="time">{props.time} Minutes</p>
// <h7>Pace:</h7>
// <p id="pace">{props.pace}/mi</p>
