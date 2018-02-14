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
        pieStartAngle: 0,
        reverseCategories: true,
        pieHole: 0.8,
        pieSliceText: 'percentage',
        // pieSliceTextStyle: {color: 'black'},
        pieSliceBorderColor: 'transparent',
        backgroundColor: { fill:'transparent' },
        slices: {
          0: { color: '#347FB4' },
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
        ['Remaining until goal', invisibleMiles],
        ['Miles for week', totalWeeklyMiles]
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
        <div className='team-member-container'>
          <div className='team-member-bio'>
            <h3 className="team-user-header__text">{this.props.user.user.first_name} {this.props.user.user.last_name}</h3>
            <div className="team-image-wrapper">
              <img className='team-user-header__image' src={this.props.profilePicture}alt={this.props.user.user.last_name}/>
            </div>
          </div>
          <div className='team-member-workouts-container'>
            {workouts}
          </div>
          <div className='team-member-graph'>
          <h4 className='workout-compare-chart__mileage-text'>Goal Performance</h4>
          <div className="goal-chart">
            <Chart
              chartType="PieChart"
              data={data.data}
              options={this.state.options}
              graph_id={graphId}
              id={this.props.user.user.id}
              width="9rem"
              height="9rem"
              legend_toggle
            />
          </div>
            <h4 className='workout-compare-chart__mileage-text'>{totalWeeklyMiles}/{this.props.teamGoal}</h4>
          </div>
        </div>
    )
  }
}

export default TeamUserContainer;
