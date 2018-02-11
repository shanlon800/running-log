import React, { Component } from 'react';
import { Chart } from 'react-google-charts';


import WorkoutCompareTile from '../components/WorkoutCompareTile'

class TeamUserContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: {
        graph_id: `chart${this.props.user.user.id}`,
        id: "chart`${this.props.user.user.id}`",
        legend: 'none',
        pieStartAngle: 90,
        pieHole: 0.5,
        pieSliceText: 'none',
        pieSliceBorderColor: 'transparent',
        backgroundColor: { fill:'transparent' },
        slices: {
          0: { color: '#369fa0' },
          1: { color: 'transparent' }
        }
      }
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
    let totalWeeklyMiles = 0
    this.props.user.workouts.forEach(workout => {
      totalWeeklyMiles += workout.distance
    })
    let invisibleMiles;
    if (this.props.teamGoal < totalWeeklyMiles) {
      invisibleMiles = 0
    }
      else {
        invisibleMiles = (this.props.teamGoal - totalWeeklyMiles)
      }

    let data = {
      data: [
        ['Label', 'Mileage'],
        ['Miles for week', totalWeeklyMiles],
        ['Remaining until goal', invisibleMiles]
      ]
    }

    let graphId = `PieChart${this.props.user.user.id}`
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
          <div className='workout-compare-chart'>
            <div className='workout-compare-chart__header'>
              <h4 className='workout-compare-chart__header-text'>Goal: {totalWeeklyMiles}/{this.props.teamGoal}</h4>
            </div>
            <Chart
              chartType="PieChart"
              data={data.data}
              options={this.state.options}
              graph_id={graphId}
              id={this.props.user.user.id}
              width="100%"
              height="100%"
              legend_toggle
            />
          </div>
        </div>
      </div>
    )
  }
}

export default TeamUserContainer;
