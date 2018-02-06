import React from 'react';
import { Link } from 'react-router'

const NavBar = props => {
  return(
    <div>
      <div className="navbar">
        <Link to='/'>Dashboard</Link>
        <Link to='/teams'>Team View</Link>
      </div>
      <div className="content">
        { props.children }
      </div>
    </div>
  )
}

export default NavBar;
