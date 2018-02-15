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
    fetch(`/api/v1/teams/${this.props.params.id}`, { credentials: 'same-origin' })
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
          <div className="team-header">
            <h1 className="team-header">{this.state.team.team_name}</h1>
            <p>Current Team Goal: {this.state.teamGoal}</p>
            <button onClick={this.toggleGoalForm}>Cancel</button>
          </div>
            <div className='team-goal-form'>
              <TeamGoalForm
              teamGoal={this.state.teamGoal}
              addNewGoal={this.addNewGoal}
              teamId={this.state.team.id}
              />
            </div>
          <div className="team-members">
            {users}
          </div>
        </div>
      )
    } else {
      return(
          <div>
          <div className="team-header">
            <div className='header-text'>
              <h1 id="team-header">{this.state.team.team_name}</h1>
            </div>
            <div className='goal-creation-text'>
              <h4>Current Team Goal: {this.state.teamGoal}</h4>
              <button onClick={this.toggleGoalForm}>Set Your Team Goal</button>
            </div>
          </div>
          <div className="team-members">
            {users}
          </div>
        </div>
      )
    }
  }
}

export default TeamContainer;
