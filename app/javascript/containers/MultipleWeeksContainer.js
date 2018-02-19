// import React, { Component } from 'react';
// import WeekCompareContainer from './WeekCompareContainer'
//
// class WeeksIndexContainer extends Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       currentWeek: [],
//       oneWeekBack: [],
//       twoWeekBack: [],
//       threeWeekBack: [],
//       fourWeekBack: []
//     }
//   }
//
//   componentDidMount() {
//     fetch('/api/v1/users', { credentials: 'same-origin' })
//       .then(response => {
//         if (response.ok) {
//           return response;
//         } else {
//           let errorMessage = `${response.status} (${response.statusText})`,
//               error = new Error(errorMessage);
//           throw(error);
//         }
//       })
//       .then(response => response.json())
//       .then(body => {
//         let newCurrentUser = body.current_user
//         let newWorkouts = body.workouts
//         let newTeams = body.teams
//         let newWeek = body.current_week
//         let pastWeeks = body.past_weeks
//         this.setState({
//           currentWeek: newWeek,
//           oneWeekBack: body.past_weeks.one_week_back,
//           twoWeekBack: body.past_weeks.two_week_back,
//           threeWeekBack: body.past_weeks.three_week_back,
//           fourWeekBack: body.past_weeks.four_week_back
//         })
//       })
//       .catch(error => console.error(`Error in fetch: ${error.message}`));
//     }
//
//
//   render() {
//     return(
//       <div>
//         <h1>Multiple Weeks Container</h1>
//         <WeekCompareContainer
//           week={this.state.currentWeek}
//           title='Current Week'
//         />
//         <WeekCompareContainer
//           week={this.state.oneWeekBack}
//           title='One Week Ago'
//         />
//         <WeekCompareContainer
//           week={this.state.twoWeekBack}
//           title='Two Weeks Ago'
//         />
//         <WeekCompareContainer
//           week={this.state.threeWeekBack}
//           title='Three Weeks Ago'
//         />
//         <WeekCompareContainer
//           week={this.state.fourWeekBack}
//           title='Four Weeks Ago'
//         />
//
//       </div>
//     )
//   }
// }
//
// export default WeeksIndexContainer;
