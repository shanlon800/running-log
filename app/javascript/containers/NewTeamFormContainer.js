import React, { Component } from 'react';
// import DropdownTile from '../components/DropdownTile'

class NewTeamFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allTeams: [],
      selectedTeam: null,
      errors: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
    this.validateTeam = this.validateTeam.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  clearErrors() {
    this.setState({errors: []})
  }

  validateTeam(){
    if(this.state.selectedTeam === '') {
      return['Please select a team to join, or press cancel']
    } else {
      return []
    }
  }

  handleChange(event) {
    let newTeam = event.target.value
    this.setState({selectedTeam: newTeam})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.clearErrors()
    let errors = this.validateTeam()
    if (errors.length === 0) {
      let formPayload = {
        user_id: this.props.currentUser.id,
        team_id: this.state.selectedTeam
      }
      this.props.addMembership(formPayload)
    } else {
      this.setState({errors: errors})
    }
  }

  render() {
    let teams = this.props.allTeams.map(team => {
      return(
        <option key={team.id} value={team.id} name={team.id}>{team.team_name} </option>
      )
    })
    return(
      <form onSubmit={this.handleSubmit}>
        <select onChange={this.handleChange}>
          {teams}
        </select>
        <input type="submit" value="Join" />
      </form>
    )
  }
}

export default NewTeamFormContainer;
