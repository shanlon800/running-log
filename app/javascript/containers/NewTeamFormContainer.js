import React, { Component } from 'react';
import DropdownTile from '../components/DropdownTile'

class NewTeamFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allTeams: []
    }
  }
  render() {
    return(
      <DropdownTile
        allTeams={this.props.allTeams}
      />
    )
  }
}

export default NewTeamFormContainer;
