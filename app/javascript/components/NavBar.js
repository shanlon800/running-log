import React from 'react';
import { Link } from 'react-router'

const NavBar = props => {
  let signUp = <a href="/users/sign_up">Sign Up</a>
  let signIn = <a href="/users/sign_in">Sign In</a>
  return(
    <div>
      <div className="navbar">
        <Link to='/'>Dashboard</Link>
        <Link to='/teams'>Team View</Link>
        {signIn}
        {signUp}
      </div>
      <div className="content">
        { props.children }
      </div>
    </div>
  )
}

export default NavBar;
