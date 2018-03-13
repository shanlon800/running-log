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
