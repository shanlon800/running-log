import React, { Component } from 'react';
import FormField from '../components/FormField'

class TeamGoalForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      goal: '',
      errors: []
    }
    this.handleGoalChange = this.handleGoalChange.bind(this);
    this.validateGoal = this.validateGoal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
  }

  clearErrors() {
    this.setState({errors: []})
  }

  handleGoalChange(event) {
    let newGoal = event.target.value
    this.setState({goal: newGoal})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.clearErrors()
    let errors = this.validateGoal()
    if (errors.length === 0) {
      let formPayload = {
        team_goal: parseInt(this.state.goal, 10),
        team_id: this.props.teamId
      }
      this.props.addNewGoal(formPayload)
    } else {
      this.setState({errors: errors})
    }
  }

  validateGoal(){
    if(this.state.goal === '') {
      return['Please enter a goal']
    } else {
      return []
    }
  }

  render() {
    return(
      <form>
        <h1>FORM!!!</h1>
        <FormField
          content={this.state.workoutDate}
          label='Team Goal'
          name='team-goal'
          handleChange={this.handleGoalChange}
        />
        <input className="button" type="submit" value="Submit" onClick={this.handleSubmit}/>
      </form>
    )
  }
}

export default TeamGoalForm
