import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import moment from 'moment';

class WeekComparisonChartContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weekRendered: [],
      options: {
        legend: 'true',
        // title : 'Weekly Mileage',
        vAxes: {
          0: {title: 'Miles'},
          1: {title: 'Avg Pace/Mi', gridlines: {color: 'none'}, minValue:[4,0,0]}
        },
        backgroundColor: { fill:'transparent' },
        seriesType: 'bars',
        chartArea:{bottom: "75", top: "100"},
        colors: ["#709CC1", "#D3503A"],
        series: {1: {type: 'line', targetAxisIndex:1}}
      }
    }
    this.calculateChartPace = this.calculateChartPace.bind(this)
  }
  calculateChartPace(miles, min) {
    let secondsPerMile = (min * 60) / miles
    let minPace = Math.floor(secondsPerMile / 60)
    let secPace = Math.floor(secondsPerMile % 60)
    if (secPace === 0){
      return [minPace, 0, 0]
    } else {
      return [minPace, secPace, 0]
    }
  }
  render() {



    let chartArray = [['Day of Week', 'Miles', 'Average Pace']]
    this.props.weekRendered.forEach(workout => {
      let chartDay = []
      let timeArray = []
      chartDay.push(moment(workout.workout_date).format("dddd"))
      chartDay.push(workout.distance)
      chartDay.push(this.calculateChartPace(workout.distance, workout.time))
      chartArray.push(chartDay)

    })

    // let data = {
    //   data: [
    //      ['Day of Week', 'Miles', 'Average Pace'],
    //      ['Monday', 5, [4,40,0]],
    //      ['Tuesday', 6, [4,20,0]],
    //      ['Wednesday', 5, [5,0,0]],
    //      ['Thursday', 6, [5,10,0]],
    //      ['Friday', 6, [6,0,0]],
    //      ['Saturday', 7, [5,0,0]],
    //      ['Sunday', 10, [5,30,0]]
    //   ]
    // }
    return(
      <Chart
        chartType="ComboChart"
        data={chartArray}
        options={this.state.options}
        graph_id="ComboChart1"
        width="90%"
        height="30rem"
        legend_toggle
      />
    )
  }
}

export default WeekComparisonChartContainer;
