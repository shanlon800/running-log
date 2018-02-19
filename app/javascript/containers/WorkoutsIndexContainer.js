import React, { Component } from 'react';
import { Link } from 'react-router'
import moment from 'moment';

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
      currentWeekStats:'',
      yearToDateStats: '',
      displayCollection:[],
      stravaData: '',
      weekDropdown: []
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
    this.handleMultipleDates = this.handleMultipleDates.bind(this)
    this.stravaPace = this.stravaPace.bind(this)
    this.handleStravaFetch = this.handleStravaFetch.bind(this)
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
        currentWeek: body.workouts,
        showNewForm: false,
        chartData: body.workouts,
        weekDropdown: body.week_dropdown
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
        allTeams: body.all_teams,
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
        currentWeek: body.workouts,
        showDetails: false,
        detailPage: null,
        chartData: body.workouts,
        weekDropdown: body.week_dropdown
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
      // let updatedWorkouts = this.state.currentWeek.filter(workout => {
      //   return workout.id !== body.id
      // })
      // updatedWorkouts = updatedWorkouts.concat(body)
      this.setState({
        currentWeek: body.workouts,
        showEditForm: false,
        selectedWorkout: null,
        showDetails: false,
        chartData: body.workouts,
        weekDropdown: body.week_dropdown
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
          chartData: body.current_week,
          yearToDateStats: body.year_to_date_index_statistics,
          currentWeekStats:body.current_week_index_statistics,
          weekDropdown: body.week_dropdown,
          weekStart: body.current_week_index_statistics.week_start,
          weekEnd: body.current_week_index_statistics.week_end
        })
        this.handleStravaFetch(body.current_user.provider, body.token, body.current_user.uid)
        // fetch(`https://www.strava.com/api/v3/athletes/${body.current_user.uid}/activities?access_token=${body.token}`)
        //   .then(response => {
        //     if (response.ok) {
        //       return response;
        //     } else {
        //       let errorMessage = `${response.status} (${response.statusText})`,
        //           error = new Error(errorMessage);
        //       throw(error);
        //     }
        //   })
        //   .then(response => response.json())
        //   .then(body => {
        //     this.setState({stravaWorkouts: body})
        //   })
        //   .catch(error => console.error(`Error in fetch: ${error.message}`));
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }


    handleStravaFetch(provider, token, id) {
      if (provider === 'strava') {
        fetch(`https://www.strava.com/api/v3/athletes/${id}/stats?access_token=${token}`)
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
            this.setState({stravaData: body})

          })
          .catch(error => console.error(`Error in fetch: ${error.message}`));
      }
    }
    // THE CODE BELOW WORKS WITHOUT STRAVA
    // componentWillMount() {
    //   fetch('/api/v1/users', { credentials: 'same-origin' })
    //     .then(response => {
    //       if (response.ok) {
    //         return response;
    //       } else {
    //         let errorMessage = `${response.status} (${response.statusText})`,
    //             error = new Error(errorMessage);
    //         throw(error);
    //       }
    //     })
    //     .then(response => response.json())
    //     .then(body => {
    //       this.setState({
    //         currentUser: body.current_user,
    //         workouts: body.workouts,
    //         belongTeams: body.belong_to_teams,
    //         currentWeek: body.current_week,
    //         oneBack: body.past_weeks.one_week_back,
    //         twoBack: body.past_weeks.two_week_back,
    //         threeBack: body.past_weeks.three_week_back,
    //         fourBack: body.past_weeks.four_week_back,
    //         allTeams: body.all_teams,
    //         chartData: body.current_week,
    //         yearToDateStats: body.year_to_date_index_statistics,
    //         currentWeekStats:body.current_week_index_statistics,
    //       })
    //     })
    //     .catch(error => console.error(`Error in fetch: ${error.message}`));
    //   }



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

    stravaPace(meters, seconds) {
      let miles = Math.round(meters * 0.000621, 1)
      let secondsPerMile = (seconds) / miles
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

    handleMultipleDates(selectedWorkout, weeksWorkouts){
      let leftCard;
      let rightCard;
      let displayCollection = []
      this.state.currentWeek.forEach(function (workout, index){
        if(weeksWorkouts.length === 1) {
          displayCollection.push(workout)
        } else if (workout.id === selectedWorkout.id && index === 0) {
          rightCard = weeksWorkouts[index + 1]
          displayCollection.push(selectedWorkout, rightCard)
        } else if (workout.id === selectedWorkout.id && index === (weeksWorkouts.length - 1)) {
          leftCard = weeksWorkouts[index - 1]
          displayCollection.push(leftCard, selectedWorkout)
        } else if (workout.id === selectedWorkout.id){
          leftCard = weeksWorkouts[index - 1]
          rightCard = weeksWorkouts[index + 1]
          displayCollection.push(leftCard, selectedWorkout, rightCard)
        }
      })
      this.setState({displayCollection: displayCollection})
    }

    toggleDetailPage(workout) {
      let workoutId;
      let currentWeek = this.state.currentWeek
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
          detailPage: null,
          displayCollection: []
        })
      }
      else {
        this.handleMultipleDates(workout, currentWeek)
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
    let stravaData;

    if (this.state.currentUser != null && this.state.currentUser.provider === 'strava' && this.state.stravaData != ''){
      stravaData =
      <div id='strava-text'>
        <div id='year-to-date'>Strava Data YTD</div>
        <div id='stats-container'>
          <div className='indiv-stats-container'>
            <div className='stat-header'>Miles:</div>
            <div className='stat-number'>{Math.round(this.state.stravaData.ytd_run_totals.distance * 0.000621, 1)}</div>
          </div>
          <div className='indiv-stats-container'>
            <div className='stat-header'>Avg Pace:</div>
            <div className='stat-number'>{this.stravaPace(this.state.stravaData.ytd_run_totals.distance, this.state.stravaData.ytd_run_totals.elapsed_time)}</div>
          </div>
          <div className='indiv-stats-container'>
            <div className='stat-header'>Number of Runs:</div>
            <div className='stat-number'>{this.state.stravaData.ytd_run_totals.count}</div>
          </div>
        </div>
      </div>
    } else {
      stravaData = ''
    }


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
        let selectedClassName;
        if (this.state.detailPage !== null) {
          handleDelete = () => this.deleteWorkout(this.state.detailPage.id)
          handleEdit = () => this.toggleEditForm(this.state.detailPage, event)
          let creator = this.state.detailPage.user_id
        }
        detailsTile = this.state.displayCollection.map(workout => {
          if (workout.id === this.state.detailPage.id) {
            selectedClassName = 'selected-detail-card'

          } else {
            selectedClassName = 'description-container'

          }
          return(
            <WorkoutDescriptionTile
            distance={workout.distance}
            time={workout.time}
            notes={workout.notes}
            date={workout.workout_date}
            id={workout.id}
            key={workout.id}
            pace={this.calculatePace(workout.distance, workout.time)}
            currentUser={this.state.currentUser}
            creator={workout.user_id}
            handleDelete={handleDelete}
            toggleEditForm={handleEdit}
            selectedClassName={selectedClassName}
            />
          )
        })
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
            weekDropdown={this.state.weekDropdown}

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
            weekDropdown={this.state.weekDropdown}
          />
        } else {
          newForm = ''
        }
    let belongTeams = this.state.belongTeams.map(team => {
      return(
        <div className="team-list-wrapper" key={`${team.team.id}`}>
          <div><Link className="team-names" to={`/teams/${team.team.id}`} >{team.team.team_name}</Link></div>
          <div className="current-goal">Current Goal: {team.goal.team_goal}</div>
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

    let paceIcon = ''
    if (this.state.yearToDateStats.year_to_date_avg_pace < this.state.currentWeekStats.average_pace) {
      paceIcon = <span><i className="fas fa-long-arrow-alt-up" id="increasing-red"></i><h7 id="increasing-red-text">({this.state.currentWeekStats.pace_rate_change}%)</h7></span>
    } else if (this.state.yearToDateStats.year_to_date_avg_pace < this.state.currentWeekStats.average_pace) {
      paceIcon = <span><i className="fas fa-long-arrow-alt-down" id='decreasing green'></i><h7 id="decreasing-green-text">({this.state.currentWeekStats.pace_rate_change}%)</h7></span>
    } else {
      paceIcon = <span><i className="fas fa-arrows-alt-h" id='equal-sign'></i></span>
    }

    let avgMilesIcon = ''
    if(this.state.yearToDateStats.average_miles_per_day_year_to_date < this.state.currentWeekStats.average_miles_per_day) {
      avgMilesIcon = <span><i className="fas fa-long-arrow-alt-up" id="increasing-green"></i><h7 id="increasing-green-text">({this.state.currentWeekStats.average_miles_change}%)</h7></span>
    } else if (this.state.yearToDateStats.average_miles_per_day_year_to_date > this.state.currentWeekStats.average_miles_per_day){
      avgMilesIcon = <span><i className="fas fa-long-arrow-alt-down" id='decreasing-red'></i><h7 id="decreasing-red-text">({this.state.currentWeekStats.average_miles_change}%)</h7></span>
    } else {
      avgMilesIcon = <span><i className="fas fa-arrows-alt-h" id='equal-sign'></i></span>
    }

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

              </div>
            </div>
            <div id="stats text">
            <div id='year-to-date'>Year To Date</div>
              <div id="stats-container">
                <div className="indiv-stats-container">
                  <div className="stat-header">Miles:</div>
                  <div className="stat-number">{this.state.yearToDateStats.total_miles_year_to_date}</div>
                </div>

                <div className="indiv-stats-container">
                  <div className="stat-header">Avg Pace:</div>
                  <div className="stat-number">{this.state.yearToDateStats.year_to_date_avg_pace}/mi</div>
                </div>

                <div className="indiv-stats-container">
                  <div className="stat-header">Days Run in a Row:</div>
                  <div className="stat-number">{this.state.yearToDateStats.days_run_in_row}</div>
                </div>
              </div>
            </div>
            {stravaData}
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
              <h3 id="current-week-statistics-header">Current Week Statistics</h3>
              <table>
              <tbody>
                <tr>
                  <td id="total-miles">Total Miles</td>
                  <td id="total-miles">{this.state.currentWeekStats.total_miles}</td>
                </tr>
                <tr>
                  <td></td>
                  <td id="ytd-stats">Week</td>
                  <td id="ytd-stats">Trend</td>
                  <td id="ytd-stats">YTD</td>
                </tr>
                <tr>
                  <td id="ytd-stats">Average Pace</td>
                  <td>{this.state.currentWeekStats.average_pace}/mi</td>
                  <td>{paceIcon}</td>
                  <td>{this.state.yearToDateStats.year_to_date_avg_pace}/mi</td>
                </tr>
                <tr>
                  <td id="ytd-stats">Average Miles per Day</td>
                  <td>{this.state.currentWeekStats.average_miles_per_day}</td>
                  <td>{avgMilesIcon}</td>
                  <td>{this.state.yearToDateStats.average_miles_per_day_year_to_date}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div id="index-page-current-week">
          <h3 id="current-week-dashboard-header">Current Week {moment(this.state.weekStart).format("M/DD")} - {moment(this.state.weekEnd).format("M/DD")}</h3>

          <div className="container">
            {currentWeek}
          </div>
          <button id="add-a-workout" onClick={this.toggleNewForm}>Add A Workout</button>
        </div>
        <div id="workout-description-breakout-container">
            {detailsTile}
          {newForm}
          {editForm}
        </div>
        <div>
        </div>
        <div id='week-compare-dashboard-tile'>
        <h3 id="chart-dashboard-header">Weekly Mileage & Pace</h3>
          <div id="google-charts-wrapper">
            <WeekComparisonChartContainer
              weekRendered={this.state.chartData}
            />
            <div id="button-compare-week">
              <button value='0' onClick={this.handleChartSelector} className="unselected-week-comparsion-button">Current Week</button>
              <button value='1' onClick={this.handleChartSelector} className="unselected-week-comparsion-button">1 Week Ago</button>
              <button value='2' onClick={this.handleChartSelector} className="unselected-week-comparsion-button">2 Weeks Ago</button>
              <button value='3' onClick={this.handleChartSelector} className="unselected-week-comparsion-button">3 Weeks Ago</button>
              <button value='4' onClick={this.handleChartSelector} className="unselected-week-comparsion-button">4 Weeks Ago</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WorkoutsIndexContainer;
