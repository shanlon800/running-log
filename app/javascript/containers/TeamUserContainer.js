import React, { Component } from 'react';
import WorkoutCompareTile from '../components/WorkoutCompareTile'
class TeamUserContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    let workouts = this.props.user.workouts.map(workout => {
      return(
          <WorkoutCompareTile
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
      <h3>{this.props.user.user.first_name} {this.props.user.user.last_name}</h3>
        {workouts}
      </div>
    )
  }
}

export default TeamUserContainer;
