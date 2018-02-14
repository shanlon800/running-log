import React from 'react';
import moment from 'moment';

const WorkoutDescriptionTile = props => {
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
    <div onClick={props.toggleDetailPage} className="description-container">
      <div className="description-card__wrapper">
        <div className="description-card__header">
          <h3 className="description-date">{date}</h3>
          <h4 id="workout-details-header">Workout Details</h4>
        </div>
        <div className="description-card__body">
          <p id="description-distance">Distance: {props.distance} Miles</p>
          <p id="description-time">Time: {props.time} Minutes</p>
          <p id="description-pace">Pace: {props.pace}/mi</p>
          <p id="description-notes">Notes: {props.notes}</p>
          {deleteButton}
          {editButton}
        </div>
      </div>
    </div>
  )
}

export default WorkoutDescriptionTile;
