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
  }
  handleGoalChange(event) {
    let newGoal = event.target.value
    this.setState({goal: newGoal})
    console.log(this.state.goal)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.clearErrors()
    let errors = this.validateGoal()
    if (errors.length === 0) {
      let formPayload = {
        team_goal: parseInt(this.state.goal, 10),
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
      </form>
    )
  }
}

export default TeamGoalForm
