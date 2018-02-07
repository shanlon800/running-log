import React, { Component } from 'react';
import WorkoutCompareTile from '../components/WorkoutCompareTile'
class TeamUserContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
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
    let workouts = this.props.user.workouts.map(workout => {
      let pace = this.calculatePace(workout.distance, workout.time)
      return(
          <WorkoutCompareTile
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
      <h3>{this.props.user.user.first_name} {this.props.user.user.last_name}</h3>
        {workouts}
      </div>
    )
  }
}

export default TeamUserContainer;
