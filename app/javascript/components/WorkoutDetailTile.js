import React from 'react';
import moment from 'moment';

const WorkoutDetailTile = props => {
  let date = moment(props.date).format("MMM DD, YYYY")
  return(
    <div>
      <h4>{date}</h4>
      <p>Distance: {props.distance} Miles</p>
      <p>Time: {props.time} Minutes</p>
      <p>Notes: {props.notes}</p>
    </div>
  )
}

export default WorkoutDetailTile;
