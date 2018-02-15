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
      this.toggleGoalForm
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
        <h3>New Goal</h3>
        <div className="team-goal-form-field">
          <FormField
            content={this.state.workoutDate}
            name='team-goal'
            handleChange={this.handleGoalChange}
            message='Enter in Miles'
          />
        </div>
        <button className='new-goal-form-button-submit' type="submit" value="Submit" onClick={this.handleSubmit}>Submit</button>
        <button className='new-goal-form-button-cancel' onClick={this.props.toggleGoalForm}>Cancel</button>
      </form>
    )
  }
}

export default TeamGoalForm
