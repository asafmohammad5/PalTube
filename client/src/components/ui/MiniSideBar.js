import React, { Component } from 'react';
import { currentUser } from '../../util/util'
import { Link } from 'react-router-dom'
import { changeTheme, getCurrentTheme } from '../../util/util'

class MiniSideBar extends Component {

  componentDidMount() {
    document.getElementById("chkTheme").checked = getCurrentTheme() === 'dark';
  }

  changeTheme = (event) => {
    let theme = event.target.checked ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    changeTheme();
  }

  render() {

    return (
      <aside className="mini-sidebar show">
        <ul>
          <li className="clickable mini-sidebar-section-header">
            <Link to="/"><i className="fas fa-home mini-icon">&nbsp;</i><p className="mini-description">Home</p></Link>
          </li>
          {currentUser() &&
            <>
            <li className="clickable mini-sidebar-section-header">
              <Link to="/videos/likes" className=""><i className="far fa-thumbs-up mini-icon">&nbsp;</i><p className="mini-description">My Likes</p></Link>
            </li>
              <li className="clickable mini-sidebar-section-header">
              <Link to="/videos/favorites"><i className="fas fa-hand-holding-heart mini-icon">&nbsp;</i><p className="mini-description">Favorites</p></Link>
              </li>
            </>
          }
         
        </ul>
      </aside>
    );
  }
}

export default MiniSideBar;