import React from 'react';
import moment from 'moment';

const WorkoutDetailTile = props => {
  let date = moment(props.date).format("MMM DD, YYYY")
  let dayOfWeek = moment(props.date).format("dddd")
  let deleteButton;
  let editButton;
  if (props.creator === props.currentUser.id) {
    deleteButton = <button id='delete' onClick={props.handleDelete} className='alert'>Delete</button>
    editButton = <button id="edit" onClick={props.toggleEditForm} value={props.id}>Edit</button>
  } else {
    let deleteButton = ""
    let editButton = ""
  }
  return(
      <div onClick={props.toggleDetailPage} className="run-card" id={props.selectedStyle}>
        <div className="run-card__wrapper">
          <div className="run-card__header">
            <h4 className="date-header">{dayOfWeek}</h4>
          </div>
          <div className="run-card__body">
            <h1 id="distance">{props.distance}</h1>
            <h7>Miles</h7>
          </div>
        </div>
      </div>
  )
}

export default WorkoutDetailTile;
