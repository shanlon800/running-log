import React, { Component } from 'react';
import { Link } from 'react-router'

import WorkoutDetailTile from '../components/WorkoutDetailTile'
import WorkoutFormContainer from './WorkoutFormContainer'
import WorkoutEditContainer from './WorkoutEditContainer'

class WorkoutsIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: null,
      workouts: [],
      teams: [],
      currentWeek: [],
      showEditForm: false,
      showNewForm: false,
      selectedWorkout: null
    }
    this.calculatePace = this.calculatePace.bind(this)
    this.addNewWorkout = this.addNewWorkout.bind(this)
    this.toggleEditForm = this.toggleEditForm.bind(this)
    this.toggleNewForm = this.toggleNewForm.bind(this)
    this.editWorkout = this.editWorkout.bind(this)
  }




  addNewWorkout(formPayload) {
    fetch('/api/v1/workouts', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(formPayload),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let newWorkout = this.state.currentWeek.concat(body)
      this.setState({
        currentWeek: newWorkout
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  editWorkout(formPayload) {
    let id = formPayload.id
    fetch(`/api/v1/workouts/${id}.json`, {
      method: 'PATCH',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formPayload)
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`;
        let error = new Error(errorMessage);
        throw(error)
      }
    })
    .then(response => response.json())
    .then(body => {
      let updatedWorkouts = this.state.currentWeek.filter(workout => {
        return workout.id !== body.id
      })
      updatedWorkouts = updatedWorkouts.concat(body)
      this.setState({
        currentWeek: updatedWorkouts
      })
    })
    .catch(error => console.error(`Error in fetch patch: ${error.message}`))
  }

  componentWillMount() {
    fetch('/api/v1/users', { credentials: 'same-origin' })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        let newCurrentUser = body.current_user
        let newWorkouts = body.workouts
        let newTeams = body.teams
        let newWeek = body.current_week
        this.setState({
          currentUser: newCurrentUser,
          workouts: newWorkouts,
          teams: newTeams,
          currentWeek: newWeek
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

    calculatePace(miles, min) {
      let secondsPerMile = (min * 60) / miles
      let minPace = Math.floor(secondsPerMile / 60)
      let secPace = secondsPerMile % 60
      if (secPace === 0){
        return `${minPace}:00`
      } else {
        return `${minPace}:${secPace}`
      }
    }

    toggleEditForm(workout, event) {
      event.preventDefault()
      let showForm = this.state.showEditForm

      if (showForm === true) {
        this.setState({
          showEditForm: false,
          selectedWorkout: null
         })
      }
      else {
        this.setState({
          showEditForm: true,
          selectedWorkout: workout
        })
      }
    }

    toggleNewForm(event) {
      event.preventDefault()
      let newShowForm = this.state.showNewForm

      if (newShowForm === true) {
        this.setState({ showNewForm: false })
      }
      else {
        this.setState({ showNewForm: true })
      }
    }

  render() {
    let editForm;
      if (this.state.showEditForm === true) {
        editForm =
          <WorkoutEditContainer
            editWorkout={this.editWorkout}
            workoutId={this.state.selectedWorkout.id}
            closeForm={this.toggleEditForm}
            selectedWorkout={this.state.selectedWorkout}
            currentUser={this.state.currentUser}
          />
      }  else {
        editForm = ''
      }

      let newForm;
        if (this.state.showNewForm === true) {
          newForm =
          <WorkoutFormContainer
            currentUser={this.state.currentUser}
            addNewWorkout={this.addNewWorkout}
          />
        } else {
          newForm = ''
        }

    let teams = this.state.teams.map(team => {
      return(
        <Link to={`/teams/${team.id}`} key={`${team.id}`}><span>{team.team_name}</span></Link>
      )
    })
    let currentWeek = this.state.currentWeek.map(workout => {
      let pace = this.calculatePace(workout.distance, workout.time)
      let handleClick = () => this.toggleEditForm(workout, event)
      // <button id="edit" onClick={this.toggleEditForm} key={workout.id + 100} value={workout.id}>Edit</button>
      return(
        <div key={workout.id + 200}>
          <WorkoutDetailTile
            distance={workout.distance}
            time={workout.time}
            notes={workout.notes}
            date={workout.workout_date}
            key={workout.id}
            id={workout.id}
            pace={pace}
            toggleEditForm={handleClick}
          />
        </div>
      )
    })
    return(
      <div>
        <h1>Workouts Index Container</h1>
        {currentWeek}
        {teams}
        <div>
          <button id="new" onClick={this.toggleNewForm}>Add A Workout</button>
        </div>
        {editForm}
        {newForm}
      </div>
    )
  }
}

export default WorkoutsIndexContainer;
