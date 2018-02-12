import React, { Component } from 'react';
import { Link } from 'react-router'

import WorkoutDetailTile from '../components/WorkoutDetailTile'
import WorkoutFormContainer from './WorkoutFormContainer'
import WorkoutEditContainer from './WorkoutEditContainer'
import WorkoutDescriptionTile from '../components/WorkoutDescriptionTile'
import NewTeamFormContainer from './NewTeamFormContainer'

class WorkoutsIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: null,
      workouts: [],
      belongTeams: [],
      currentWeek: [],
      showEditForm: false,
      showNewForm: false,
      selectedWorkout: null,
      detailPage: null,
      showDetails: false,
      allTeams: []
    }
    this.calculatePace = this.calculatePace.bind(this)
    this.addNewWorkout = this.addNewWorkout.bind(this)
    this.toggleEditForm = this.toggleEditForm.bind(this)
    this.toggleNewForm = this.toggleNewForm.bind(this)
    this.editWorkout = this.editWorkout.bind(this)
    this.deleteWorkout = this.deleteWorkout.bind(this)
    this.closeEditForm = this.closeEditForm.bind(this)
    this.toggleDetailPage = this.toggleDetailPage.bind(this)
    this.addMembership = this.addMembership.bind(this)
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
      this.setState({
        currentWeek: body,
        showNewForm: false
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addMembership(formPayload) {
    fetch('/api/v1/memberships', {
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
      this.setState({
        belongTeams: body
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  deleteWorkout(id) {
    fetch(`/api/v1/workouts/${id}`, {
      credentials: 'same-origin',
      method: 'DELETE'
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
      this.setState({
        currentWeek: body,
        showDetails: false,
        detailPage: null
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
        currentWeek: updatedWorkouts,
        showEditForm: false,
        selectedWorkout: null
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
        let newTeams = body.belong_to_teams
        let newWeek = body.current_week
        let allTeams = body.all_teams
        this.setState({
          currentUser: newCurrentUser,
          workouts: newWorkouts,
          belongTeams: newTeams,
          currentWeek: newWeek,
          allTeams: allTeams
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

    calculatePace(miles, min) {
      let secondsPerMile = (min * 60) / miles
      let minPace = Math.floor(secondsPerMile / 60)
      let secPace = Math.floor(secondsPerMile % 60)
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


    closeEditForm(event) {
      event.preventDefault()
      let showForm = this.state.showEditForm
      if (showForm === true) {
        this.setState({
          showEditForm: false,
          selectedWorkout: null
         })
      }
    }

    toggleDetailPage(workout) {
      let workoutId;
      if (workout === null) {
        workoutId = null
      } else {
        workoutId = workout.id
        }
        let detailStateId;
      if (this.state.detailPage === null) {
        detailStateId = null
      } else {
        detailStateId = this.state.detailPage.id
      }

      if (detailStateId === workoutId) {
        this.setState({
          showDetails: false,
          detailPage: null
        })
      }
      else {
        this.setState({
          showDetails: true,
          detailPage: workout
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
    let detailsTile;
    let handleDelete;
    let handleEdit;
      if(this.state.showDetails === true) {
        if (this.state.detailPage !== null) {
          handleDelete = () => this.deleteWorkout(this.state.detailPage.id)
          handleEdit = () => this.toggleEditForm(this.state.detailPage, event)
          let creator = this.state.detailPage.user_id
        }
        detailsTile =
          <WorkoutDescriptionTile
            distance={this.state.detailPage.distance}
            time={this.state.detailPage.time}
            notes={this.state.detailPage.notes}
            date={this.state.detailPage.workout_date}
            id={this.state.detailPage.id}
            pace={this.calculatePace(this.state.detailPage.distance, this.state.detailPage.time)}
            currentUser={this.state.currentUser}
            creator={this.state.detailPage.user_id}
            handleDelete={handleDelete}
            toggleEditForm={handleEdit}
          />
      } else
        {
          detailsTile = ''
        }
    let editForm;
      if (this.state.showEditForm === true) {
        editForm =
          <WorkoutEditContainer
            editWorkout={this.editWorkout}
            workoutId={this.state.selectedWorkout.id}
            closeForm={this.toggleEditForm}
            selectedWorkout={this.state.selectedWorkout}
            currentUser={this.state.currentUser}
            closeEditForm={this.closeEditForm}

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
            toggleNewForm={this.toggleNewForm}
          />
        } else {
          newForm = ''
        }

    let belongTeams = this.state.belongTeams.map(team => {
      return(
        <Link to={`/teams/${team.id}`} key={`${team.id}`}><span>{team.team_name}</span></Link>
      )
    })
    let currentWeek = this.state.currentWeek.map(workout => {
      let pace = this.calculatePace(workout.distance, workout.time)
      let toggleDetailPage = () => this.toggleDetailPage(workout)
      let selectedStyle;
      if (this.state.detailPage !== null && this.state.detailPage.id === workout.id){
        selectedStyle = "selected"
      }

      return(
          <WorkoutDetailTile
            distance={workout.distance}
            time={workout.time}
            notes={workout.notes}
            date={workout.workout_date}
            key={workout.id}
            id={workout.id}
            pace={pace}
            currentUser={this.state.currentUser}
            creator={workout.user_id}
            toggleDetailPage={toggleDetailPage}
            selectedStyle={selectedStyle}
          />
      )
    })
    return(
      <div>
        <h1 id="current-week-header">Current Week</h1>
        <div>
        <button id="new" onClick={this.toggleNewForm}>Add A Workout</button>
        </div>
        <div className="container">
          {currentWeek}
        </div>
        <div className="description-container">
          {detailsTile}
        </div>
        <div id="team-list">
          {belongTeams}
          <div>
            <NewTeamFormContainer
              allTeams={this.state.allTeams}
              currentUser={this.state.currentUser}
              addMembership={this.addMembership}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default WorkoutsIndexContainer;
