import React from 'react';

const DropdownTile = (props) => {

  allTeams = this.props.allTeams.map(team => {
    return(
      <option value={team.team_name}>{team.team_name}</option>
    )
  })
  return(
    <select>
      <option value="grapefruit">Grapefruit</option>
    </select>
  )
}

export default DropdownTile
