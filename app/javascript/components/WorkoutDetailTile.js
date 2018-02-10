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
      <div onClick={props.toggleDetailPage} className="run-card" id={props.selectedStyle}>
        <div className="run-card__wrapper">
          <div className="run-card__header">
            <h4 className="date-header">{date}</h4>
          </div>
          <div className="run-card__body">
            <p id="distance">Distance: {props.distance} Miles</p>
            <p id="time">Time: {props.time} Minutes</p>
            <p id="pace">Pace: {props.pace}/mi</p>
            <p>User: {props.creator}</p>
          </div>
        </div>
      </div>
  )
}

export default WorkoutDetailTile;
