import React from 'react';

const DropdownTile = (props) => {

  allTeams = this.props.allTeams.map(team => {
    return(
      <option value={team.team_name}>{team.team_name}</option>
    )
  })
}

export default DropdownTile
