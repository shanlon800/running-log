import React from 'react';
import moment from 'moment';

const WorkoutDetailTile = props => {
  let date = moment(props.date).format("MMM DD, YYYY")
  let deleteButton;
  let editButton;
  if (props.creator === props.currentUser.id) {
    deleteButton = <button onClick={props.handleDelete} className='alert'>Delete</button>
    editButton = <button id="edit" onClick={props.toggleEditForm} value={props.id}>Edit</button>
  } else {
    let deleteButton = ""
    let editButton = ""
  }

  return(
    <div>
      <h4>{date}</h4>
      <p id="distance">Distance: {props.distance} Miles</p>
      <p id="time">Time: {props.time} Minutes</p>
      <p id="pace">Pace: {props.pace}/mi</p>
      <p id="notes">Notes: {props.notes}</p>
      <p>User: {props.creator}</p>
      {deleteButton}
      {editButton}
    </div>
  )
}

export default WorkoutDetailTile;
