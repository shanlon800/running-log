import React, { Component } from 'react';
import WorkoutCompareTile from '../components/WorkoutCompareTile'

class WeekCompareContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      week: []
    }
  }


  render() {
    let workouts = this.props.week.map(workout => {
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
        <h2>{this.props.title}</h2>
        {workouts}
      </div>
    )
  }
}

export default WeekCompareContainer;
