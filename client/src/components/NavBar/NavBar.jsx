import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

export class NavBar extends Component {
  render() {
    return (
      <div className='navbar'>
        <h3>Countries of the World</h3>
        <Link className="nav-link" to='/home' ><h3>Home</h3></Link>
        <Link className="nav-link" to='/activities' ><h3>Activities</h3></Link>
        <Link className="nav-link" to='/createActivity' ><h3>Create Activity</h3></Link>
      </div>
    )
  }
}

export default NavBar