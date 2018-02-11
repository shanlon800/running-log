import React, { Component } from 'react';
import FormField from '../components/FormField'

class TeamGoalFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      goal: '',
    }
    this.handleGoalChange = this.handleGoalChange.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateGoal = this.validateGoal.bind(this);
  }

  clearErrors() {
    this.setState({errors: []})
  }

  handleGoalChange(event) {
    let newGoal = event.target.value
    this.setState({goal: newGoal})
  }

  handleClear() {
    this.setState({
      goal: '',
      errors: []
    })
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
      return['Please enter a distance']
    } else {
      return []
    }
  }

  render() {
    let errorMessage = this.state.errors.map(error => {
      return(<div key={error}> {error} </div>)
    })
    return(
      <div className="form-container">
        <div className="workout-form">
          <form className='new-workout-form callout' onSubmit={this.handleSubmit}>
            <h3>Add A New Goal</h3>
            <span className="errors">{errorMessage}</span>
            <FormField
              content={this.state.workoutDate}
              label='Team Goal'
              name='team-goal'
              handleChange={this.handleGoalChange}
            />
            <input className="button" type="submit" value="Submit" onClick={this.handleSubmit}/>
            <button className="button" onClick={this.props.toggleNewForm}>Cancel</button>
          </form>
        </div>
        <div className="form-sheet"></div>
      </div>
    )
  }
}

export default TeamGoalFormContainer;
