import React, { Component } from 'react';
import { Link } from 'react-router'

import WorkoutDetailTile from '../components/WorkoutDetailTile';
import WorkoutFormContainer from './WorkoutFormContainer';
import WorkoutEditContainer from './WorkoutEditContainer';
import WorkoutDescriptionTile from '../components/WorkoutDescriptionTile';
import NewTeamFormContainer from './NewTeamFormContainer';
import WeekComparisonChartContainer from './WeekComparisonChartContainer';

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
      showChooseTeam: false,
      showNewTeam: false,
      selectedWorkout: null,
      detailPage: null,
      showDetails: false,
      allTeams: [],
      chartSelected: '0',
      chartData: [],
      oneBack: [],
      twoBack: [],
      threeBack: [],
      fourBack: [],
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
    this.addTeam = this.addTeam.bind(this)
    this.toggleChooseTeam = this.toggleChooseTeam.bind(this)
    this.toggleNewTeamForm = this.toggleNewTeamForm.bind(this)
    this.handleChartSelector = this.handleChartSelector.bind(this)
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
        belongTeams: body.belong_to_teams
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addTeam(formPayload) {
    fetch('/api/v1/teams', {
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
        belongTeams: body.belong_to_teams,
        allTeams: body.all_teams
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
        this.setState({
          currentUser: body.current_user,
          workouts: body.workouts,
          belongTeams: body.belong_to_teams,
          currentWeek: body.current_week,
          oneBack: body.past_weeks.one_week_back,
          twoBack: body.past_weeks.two_week_back,
          threeBack: body.past_weeks.three_week_back,
          fourBack: body.past_weeks.four_week_back,
          allTeams: body.all_teams,
          chartData: body.current_week
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

    toggleChooseTeam(event) {
      event.preventDefault()
      let newChooseTeam = this.state.showChooseTeam

      if (newChooseTeam === true) {
        this.setState({ showChooseTeam: false })
      }
      else {
        this.setState({ showChooseTeam: true })
      }
    }

    toggleNewTeamForm(event) {
      event.preventDefault()
      let newTeamForm = this.state.showNewTeam

      if (newTeamForm === true) {
        this.setState({ showNewTeam: false })
      }
      else {
        this.setState({ showNewTeam: true })
      }
    }

    handleChartSelector(event) {
      event.preventDefault()

      if (event.target.value === '0') {
        this.setState({chartData: this.state.currentWeek})
      } else if (event.target.value === '1') {
        this.setState({chartData: this.state.oneBack})
      } else if (event.target.value == '2') {
        this.setState({chartData: this.state.twoBack})
      } else if (event.target.value == '3') {
        this.setState({chartData: this.state.threeBack})
      } else if (event.target.value == '4') {
        this.setState({chartData: this.state.fourBack})
      }

    }

  render() {
    let detailsTile;
    let handleDelete;
    let handleEdit;
    let imageUrl;
    let imageAlt;
    let currentUserName;
    let email;

    if (this.state.currentUser != null){
      imageUrl = this.state.currentUser.profile_photo.url
      imageAlt = this.state.currentUser.last_name
      currentUserName = `${this.state.currentUser.first_name} ${this.state.currentUser.last_name}`
      email = this.state.currentUser.email
    } else {
      imageUrl = ''
      imageAlt = ''
    }

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
        <div className="team-list-wrapper" key={`${team.id}`}>
          <div><Link className="team-names" to={`/teams/${team.id}`} >{team.team_name}</Link></div>
          <div className="current-goal">Current Goal: 50</div>
        </div>
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
        <div id="top-row-container">
          <div id ="user-profile">
            <h3 id="current-runner">Current Runner</h3>
            <div id="bio-wrapper">
              <div className="image-wrap" id="wrapper">
                <img className='current-runner__image' src={imageUrl}alt={imageAlt}/>
              </div>
              <div className="bio-info">
                <h2 className="bio-header">{currentUserName}</h2>
                <p className="bio-text">{email}</p>
                <p className="bio-text">Boston, MA</p>
              </div>
            </div>
            <div id="stats text">
            <div id='year-to-date'>Year To Date</div>
              <div id="stats-container">
                <div className="indiv-stats-container">
                  <div className="stat-header">Miles:</div>
                  <div className="stat-number">123</div>
                </div>

                <div className="indiv-stats-container">
                  <div className="stat-header">Avg Pace:</div>
                  <div className="stat-number">7:23/mi</div>
                </div>

                <div className="indiv-stats-container">
                  <div className="stat-header">Days Run in a Row:</div>
                  <div className="stat-number">22</div>
                </div>
                <div className="indiv-stats-container">
                  <div className="stat-header">Total Calories Burned:</div>
                  <div className="stat-number">16605</div>
                </div>
              </div>

            </div>
          </div>
          <div id="team-list">
            <div id="join-team">
              <h3 id="teams-label">My Teams</h3>
              {belongTeams}
              <div>
                <NewTeamFormContainer
                allTeams={this.state.allTeams}
                currentUser={this.state.currentUser}
                addMembership={this.addMembership}
                addTeam={this.addTeam}
                toggleChooseTeam={this.toggleChooseTeam}
                toggleNewTeamForm={this.toggleNewTeamForm}
                showNewTeam={this.state.showNewTeam}
                showChooseTeam={this.state.showChooseTeam}
                />
              </div>
            </div>
            <div id="random-box">
            </div>
          </div>

        </div>
        <div id="index-page-current-week">
          <h3 id="current-week-dashboard-header">Current Week 2/12 - 2/18</h3>
          <div id="current-month">
            <h1 id="month-text">February</h1>
          </div>
          <div className="container">
            {currentWeek}
          </div>
        </div>
          {detailsTile}
        {newForm}
        {editForm}
        <div>
          <button id="new" onClick={this.toggleNewForm}>Add A Workout</button>
        </div>
        <div id='week-compare-dashboard-tile'>
          <div id="google-charts-wrapper">
            <WeekComparisonChartContainer
              weekRendered={this.state.chartData}
            />
            <div id="button-compare-week">
              <button value='0' onClick={this.handleChartSelector}>Current Week</button>
              <button value='1' onClick={this.handleChartSelector}>1 Week Ago</button>
              <button value='2' onClick={this.handleChartSelector}>2 Weeks Ago</button>
              <button value='3' onClick={this.handleChartSelector}>3 Weeks Ago</button>
              <button value='4' onClick={this.handleChartSelector}>4 Weeks Ago</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WorkoutsIndexContainer;
