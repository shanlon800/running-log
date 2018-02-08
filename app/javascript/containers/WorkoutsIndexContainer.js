import React, { Component } from 'react';
import WorkoutDetailTile from '../components/WorkoutDetailTile'
import { Link } from 'react-router'

class WorkoutsIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: null,
      workouts: [],
      teams: [],
      currentWeek: []
    }
    this.calculatePace = this.calculatePace.bind(this)
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

  render() {
    let teams = this.state.teams.map(team => {
      return(
        <Link to={`/teams/${team.id}`}><span>{team.team_name}</span></Link>
      )
    })
    let currentWeek = this.state.currentWeek.map(workout => {
      let pace = this.calculatePace(workout.distance, workout.time)
      return(
        <WorkoutDetailTile
          distance={workout.distance}
          time={workout.time}
          notes={workout.notes}
          date={workout.workout_date}
          key={workout.id}
          id={workout.id}
          pace={pace}
        />
      )
    })
    return(
      <div>
        <h1>Workouts Index Container</h1>
        {currentWeek}
        {teams}
      </div>
    )
  }
}

export default WorkoutsIndexContainer;
