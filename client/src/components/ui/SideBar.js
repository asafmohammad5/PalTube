import React, { Component } from 'react';
import { currentUser } from '../../util/util'
import { Link } from 'react-router-dom'
import { changeTheme } from '../../util/util'

class SideBar extends Component {

  constructor(props) {
    super(props)
  }

  changeTheme = (event) => {
    let theme = event.target.checked ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    changeTheme();
  }

  render() {

    let profileSrc = currentUser() ? currentUser().image : "/stylesheets/images/default_avatar_2.png";
    let userName = currentUser() ? currentUser().userName : "guest user";
    return (
      <aside className="sidebar show">
        <div className="sidebar-user-info">
          <img src={profileSrc} className="sidebar-avatar" />
          <p className="sidebar-username">{userName}</p>
          <label className="switch">
            <input type="checkbox" onChange={this.changeTheme} />>
            <span className="slider"></span>
          </label>
        </div>

        <hr />
        <ul>
          <li><p className="sidebar-section-header">Categories</p></li>
          <li className="sidebar-item">
            <i className="fas fa-cat"></i>
            <Link to="/search/cats">Funny Cats</Link>
            </li>
          <li className="sidebar-item"><Link to="/search/dog">Funny Dogs</Link></li>
        </ul>
      </aside>
    );
  }
}

export default SideBar;