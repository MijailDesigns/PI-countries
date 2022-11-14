import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/logox.png'
import c from './NavBar.module.css'
import { GoThreeBars  } from 'react-icons/go';

export class NavBar extends Component {

  myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  render() {

    // function myFunction() {
    //   var x = document.getElementById("myTopnav");
    //   if (x.className === "topnav") {
    //     x.className += " responsive";
    //   } else {
    //     x.className = "topnav";
    //   }
    // }

    return (
      <div className={c.navbar}>
        <div className={c.logo}>
          <img src={logo} alt='logo' style={{height: '45px', width: 'auto'}}/>
          Compass
        </div>
        
        <div className={c.paths}>
          <Link className={c.navLink} to='/home' >Home</Link>
          <Link className={c.navLink} to='/activities' >Activities</Link>
          <Link className={c.navLink} to='/createActivity/create' >Create Activity</Link>
          <Link href="#" className={c.icon} onclick={this.myFunction}>
            <GoThreeBars className={c.icon} size={20} />
          </Link>
        </div>
        
      </div>
    )
  }
}

export default NavBar