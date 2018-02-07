import React from 'react';
import moment from 'moment';

const WorkoutCompareTile = props => {
  let date = moment(props.date).format("MMM DD, YYYY")
  return(
    <div>
      <h4>{date}</h4>
      <p id="distance">Distance: {props.distance} Miles</p>
      <p id="time">Time: {props.time} Minutes</p>
    </div>
  )
}

export default WorkoutCompareTile;
