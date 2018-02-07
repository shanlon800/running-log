import React, { Component } from 'react';
import WorkoutDetailTile from '../components/WorkoutDetailTile'

class WorkoutsIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: null,
      workouts: [],
      teams: [],
      currentWeek: []
    }
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

  render() {
    let currentWeek = this.state.currentWeek.map(workout => {
      return(
        <WorkoutDetailTile
          distance={workout.distance}
          time={workout.time}
          notes={workout.notes}
          date={workout.workout_date}
          key={workout.id}
          id={workout.id}
        />
      )
    })
    return(
      <div>
        <h1>Workouts Index Container</h1>
        {currentWeek}
      </div>
    )
  }
}

export default WorkoutsIndexContainer;
