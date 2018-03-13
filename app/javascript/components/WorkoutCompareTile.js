import React from 'react';
import moment from 'moment';


const WorkoutCompareTile = props => {
  let weekday = moment(props.date).format("ddd")
  let date = moment(props.date).format("M/DD")


  return(
    <div className='workout-compare-card'>
      <div className='workout-compare-card__date'>
        <div className='team-workout-date'>{weekday}</div>
      </div>
      <div className="workout-compare-card__distance">
        <h3 id="distance">{props.distance}</h3>
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
