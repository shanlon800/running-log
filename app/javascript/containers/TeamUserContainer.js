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
    let secPace = Math.floor(secondsPerMile % 60)
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
      <div className="team-user">
        <div className='team-container'>
          <div className='team-user-header'>
            <h3 className="team-user-header__text">{this.props.user.user.first_name} {this.props.user.user.last_name}</h3>
            <img className='team-user-header__image' src={this.props.profilePicture}alt={this.props.user.user.last_name}/>
          </div>
          {workouts}
        </div>
      </div>
    )
  }
}

export default TeamUserContainer;
