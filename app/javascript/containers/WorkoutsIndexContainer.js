import React, { Component } from 'react';

class WorkoutsIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: null,
      workouts: [],
      teams: []
    }
  }

  componentDidMount() {
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
        this.setState({
          currentUser: newCurrentUser,
          workouts: newWorkouts,
          teams: newTeams
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

  render() {
    debugger
    return(
      <h1>Workouts Index Container</h1>
    )
  }
}

export default WorkoutsIndexContainer;
