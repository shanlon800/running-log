import React, { Component } from 'react';
import FormField from '../components/FormField'

class NewTeamFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allTeams: [],
      selectedTeam: null,
      errors: [],
      newTeam: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
    this.validateTeam = this.validateTeam.bind(this);
    this.validateNewTeam = this.validateNewTeam.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNewTeamSubmit = this.handleNewTeamSubmit.bind(this)
    this.handleNewTeamChange = this.handleNewTeamChange.bind(this)
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

  validateNewTeam(){
    if(this.state.selectedTeam === '') {
      return['Please enter a team, or press cancel']
    } else {
      return []
    }
  }

  handleChange(event) {
    let newTeam = event.target.value
    this.setState({selectedTeam: newTeam})
  }

  handleNewTeamChange(event) {
    let newTeamAdded = event.target.value
    this.setState({newTeam: newTeamAdded})
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

  handleNewTeamSubmit(event) {
    event.preventDefault()
    this.clearErrors()
    let errors = this.validateNewTeam()
    if (errors.length === 0) {
      let formPayload = {
        team_name: this.state.newTeam
      }
      this.props.addTeam(formPayload)
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
    let joinTeam;
    let newTeamButton = <button className="new-team-button" onClick={this.props.toggleNewTeamForm}>Create a New Team</button>
    let chooseButton = <button className="choose-existing-team" onClick={this.props.toggleChooseTeam}>Join Existing Team</button>

    if (this.props.showChooseTeam === true) {
      newTeamButton = ''
      chooseButton = <button id='new-team-cancel-button' onClick={this.props.toggleChooseTeam}>Cancel</button>
      joinTeam =
        <form onSubmit={this.handleSubmit}>
        <h5>Join a Team</h5>
          <select onChange={this.handleChange}>
            {teams}
          </select>
          <input type="submit" value="Join" />
        </form>
    } else {
      joinTeam = ''
    }

    let newTeam;
    if (this.props.showNewTeam === true) {
      chooseButton = ''
      newTeamButton = <button id='new-team-cancel-button' onClick={this.props.toggleNewTeamForm}>Cancel</button>
      newTeam =
        <div>
          <FormField
          content={this.state.newTeam}
          label='Add New Team'
          name='new-team'
          handleChange={this.handleNewTeamChange}
          message="Please enter team name here"
          />
          <button id='new-team-cancel-button' onClick={this.handleNewTeamSubmit}>Submit</button>
        </div>
    } else {
      newTeam = ''
    }
    return(
      <div id="new-team-forms">
        <div id="join-team-button-collection">
          {chooseButton}
          {newTeamButton}
        </div>
          {joinTeam}
          {newTeam}
      </div>
    )
  }
}

export default NewTeamFormContainer;
