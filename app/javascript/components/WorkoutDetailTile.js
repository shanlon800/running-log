import React from 'react';
import moment from 'moment';

const WorkoutDetailTile = props => {
  let date = moment(props.date).format("MMM DD, YYYY")
  return(
    <div>
      <h4>{date}</h4>
      <p id="distance">Distance: {props.distance} Miles</p>
      <p id="time">Time: {props.time} Minutes</p>
      <p id="pace">Pace: {props.pace}/mi</p>
      <p id="notes">Notes: {props.notes}</p>
    </div>
  )
}

export default WorkoutDetailTile;
