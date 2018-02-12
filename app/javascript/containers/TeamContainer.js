import React, { Component } from 'react';
import TeamUserContainer from './TeamUserContainer';
import TeamGoalForm from './TeamGoalForm';

class TeamContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      team: [],
      users: [],
      teamGoal: '',
      showTeamGoal: false
    }
    this.addNewGoal = this.addNewGoal.bind(this);
    this.toggleGoalForm = this.toggleGoalForm.bind(this);
  }

  componentWillMount() {
    fetch('/api/v1/teams/1', { credentials: 'same-origin' })
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
        let newTeam = body.team
        let newUsers = body.users
        let newGoal = body.goal
        this.setState({
          team: newTeam,
          users: newUsers,
          teamGoal: newGoal
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

    addNewGoal(formPayload) {
      fetch('/api/v1/goals', {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(formPayload),
        headers: { 'Content-Type': 'application/json' }
      })
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
        this.setState({
          teamGoal: body,
          showGoalForm: false
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

    toggleGoalForm(event) {
      event.preventDefault()
      let newGoalForm = this.state.showGoalForm

      if (newGoalForm === true) {
        this.setState({ showGoalForm: false })
      }
      else {
        this.setState({ showGoalForm: true })
      }
    }

  render() {
    let profilePicture
    let users = this.state.users.map(user => {
      if (user.user.profile_photo != null) {
        profilePicture = user.user.profile_photo.url
      } else {
        profilePicture = ''
      }
      return(
        <TeamUserContainer
          user={user}
          key={user.user.id}
          profilePicture={profilePicture}
          teamGoal={this.state.teamGoal}
        />
      )
    })
    if (this.state.showGoalForm === true) {
      return(
        <div>
          <h1 id="team-header">{this.state.team.team_name} Home Page</h1>
          <p>Team Goal: {this.state.teamGoal}</p>
          <button onClick={this.toggleGoalForm}>Set Your Team Goal</button>
          <TeamGoalForm
            teamGoal={this.state.teamGoal}
            addNewGoal={this.addNewGoal}
            teamId={this.state.team.id}
          />
          {users}
        </div>
      )
    } else {
      return(
          <div>
          <h1 id="team-header">{this.state.team.team_name} Home Page</h1>
          <p>Team Goal: {this.state.teamGoal}</p>
          <button onClick={this.toggleGoalForm}>Set Your Team Goal</button>
          {users}
        </div>
      )
    }
  }
}

export default TeamContainer;
