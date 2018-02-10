import React, { Component } from 'react';
import TeamUserContainer from './TeamUserContainer'

class TeamContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      team: [],
      users: []
    }
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
        this.setState({
          team: newTeam,
          users: newUsers
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
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
        />
      )
    })
    return(
      <div>
        <h1>Team Container</h1>
        {users}
      </div>
    )
  }
}

export default TeamContainer;
