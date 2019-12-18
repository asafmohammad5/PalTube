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
    let username = currentUser() ? currentUser().username : "guest user";
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
          <li className="clickable sidebar-section-header">
            <Link to="/">
              <i className="fas fa-home">&nbsp;</i>
              <span className="">Home</span>
            </Link>
          </li>
          {currentUser() &&
            <>
              <li className="clickable sidebar-section-header">
                <i className="far fa-thumbs-up">&nbsp;</i>
              <Link to="/videos/likes" className="">Liked Videos</Link>
              </li>
              <li className="clickable sidebar-section-header">
                <i className="fas fa-hand-holding-heart">&nbsp;</i>
                <span className="">Favorite Videos</span>
              </li>
            </>
          }
          <li className="sidebar-section-header">
            <i className="fas fa-th-list">&nbsp;</i>
            <span >Categories</span></li>
          <li className="sidebar-item clickable">
            <i className="fas fa-cat">&nbsp;</i>
            <Link to="/search/cats">Funny Cats</Link>
          </li>
          <li className="sidebar-item clickable">
            <i className="fas fa-dog">&nbsp;</i>
            <Link to="/search/dog">Funny Dogs</Link>
          </li>
          <li className="sidebar-item clickable">
            <i className="fas fa-child">&nbsp;</i>
            <Link to="/search/kids">kids</Link>
          </li>
          <li className="sidebar-item clickable">
            <i className="fas fa-dove">&nbsp;</i>
            <Link to="/search/birds">birds</Link>
          </li>
          <li className="sidebar-item clickable">
            <i className="fas fa-horse">&nbsp;</i>
            <Link to="/search/horse">horses</Link>
          </li>
        </ul>
      </aside>
    );
  }
}

export default SideBar;