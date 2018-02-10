import React, { Component } from 'react';
import FormField from '../components/FormField'

class WorkoutEditContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      workoutDistance: this.props.selectedWorkout.distance,
      workoutDate: this.props.selectedWorkout.workout_date,
      workoutTime: this.props.selectedWorkout.time,
      workoutNotes: this.props.selectedWorkout.notes,
      id: this.props.selectedWorkout.id,
      errors: []
    }
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleDistanceChange = this.handleDistanceChange.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateDate = this.validateDate.bind(this);
    this.validateTime = this.validateTime.bind(this);
    this.validateDistance = this.validateDistance.bind(this);

  }

  clearErrors() {
    this.setState({errors: []})
  }

  handleDistanceChange(event) {
    let newDistance = event.target.value
    this.setState({workoutDistance: newDistance})
  }

  handleDateChange(event) {
    let newDate = event.target.value
    this.setState({workoutDate: newDate})
  }

  handleTimeChange(event) {
    let newTime = event.target.value
    this.setState({workoutTime: newTime})
  }

  handleNotesChange(event) {
    let newNotes = event.target.value
    this.setState({workoutNotes: newNotes})
  }

  handleClear() {
    this.setState({
      workoutDistance: 0,
      workoutDate: '',
      workoutTime: 0,
      workoutNotes: '',
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.clearErrors()
    let errors = this.validateDate()
    errors = errors.concat(this.validateTime())
    errors = errors.concat(this.validateDistance())
    if (errors.length === 0) {
      let formPayload = {
        distance: parseInt(this.state.workoutDistance, 10),
        workout_date: this.state.workoutDate,
        time: parseInt(this.state.workoutTime, 10),
        notes: this.state.workoutNotes,
        user_id: this.props.currentUser.id,
        id: this.props.selectedWorkout.id
      }
      this.props.editWorkout(formPayload)
    } else {
      this.setState({errors: errors})
    }
  }

  validateDistance(){
    if(this.state.workoutDistance === '') {
      return['Please enter a distance']
    } else {
      return []
    }
  }

  validateDate(){
    if(this.state.workoutDate === '') {
      return['Please enter a date']
    } else {
      return []
    }
  }

  validateTime(){
    if(this.state.workoutTime === '') {
      return['Please enter the total time of the run in minutes']
    } else {
      return []
    }
  }

  render() {
    let errorMessage = this.state.errors.map(error => {
      return(<div key={error}> {error} </div>)
    })
    return(
      <div className="form-container">
        <div className="workout-form">
          <form id='new-workout-form callout' onSubmit={this.handleSubmit}>
            <h3>Edit a Workout</h3>
            <span className="errors">{errorMessage}</span>
            <FormField
              content={this.state.workoutDate}
              label='Workout Date'
              name='workout-date'
              handleChange={this.handleDateChange}
            />
            <FormField
              content={this.state.workoutDistance}
              label='Workout Distance'
              name='workout-distance'
              handleChange={this.handleDistanceChange}
            />
            <FormField
              content={this.state.workoutTime}
              label='Workout Time'
              name='workout-time'
              handleChange={this.handleTimeChange}
            />
            <FormField
              content={this.state.workoutNotes}
              label='Workout Notes'
              name='workout-notes'
              handleChange={this.handleNotesChange}
            />
            <input className="button" type="submit" value="Submit" onClick={this.handleSubmit}/>
            <button className="button" onClick={this.props.closeEditForm}>Cancel</button>
          </form>
        </div>
        <div className="form-sheet"></div>
      </div>
    )
  }
}

export default WorkoutEditContainer;
