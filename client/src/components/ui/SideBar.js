import React, { Component } from 'react';
import { currentUser } from '../../util/util'
import { Link } from 'react-router-dom'
import { changeTheme, getCurrentTheme } from '../../util/util';


class SideBar extends Component {

  componentDidMount() {
    document.getElementById("chkTheme").checked = getCurrentTheme() === 'dark';
  }

  changeTheme = (event) => {
    let theme = event.target.checked ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    changeTheme();
  }

  render() {
    let profile;
    if (currentUser()) {
      profile = <li className="clickable sidebar-section-header">
         <Link to={`/profile/${currentUser().id}`}>
          <i className="far fa-user">&nbsp;</i>
          <span className="">Profile</span>
          </Link>
        </li>
    } else {
      profile = null;
    }
    let profileSrc = currentUser() ? currentUser().image : "/stylesheets/images/default_avatar_2.png";
    let username = currentUser() ? currentUser().username : "guest";
    return (
      <aside className="sidebar hide">
        <div className="sidebar-user-info">
          <img src={profileSrc} className="sidebar-avatar" alt={username} />
          <p className="sidebar-username">{username}</p>
          <label className="switch">
            <input id="chkTheme" type="checkbox" onChange={this.changeTheme} />>
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
          {profile}
          {currentUser() &&
            <>
              <li className="clickable sidebar-section-header">
                <i className="far fa-thumbs-up">&nbsp;</i>
                <Link to="/videos/likes" className="">Liked Videos</Link>
              </li>
              <li className="clickable sidebar-section-header">
                <i className="fas fa-hand-holding-heart">&nbsp;</i>
                <Link to="/videos/favorites">Favorite Videos</Link>
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
            <Link to="/search/kids">Funny kids</Link>
          </li>
          <li className="sidebar-item clickable">
            <i className="fas fa-dove">&nbsp;</i>
            <Link to="/search/birds">Funny birds</Link>
          </li>
          <li className="sidebar-item clickable">
            <i className="fas fa-horse">&nbsp;</i>
            <Link to="/search/horse">Funny horses</Link>
          </li>
           <li className="sidebar-item clickable">
            <i style={{'font-size':'16px'}} className="icofont-monkey">&nbsp;</i>
            <Link to="/search/monkey">Funny monkeys</Link>
          </li>
           <li className="sidebar-item clickable">
            <i style={{'font-size':'16px'}} className="icofont-penguin">&nbsp;</i>
            <Link to="/search/penguin">Funny penguins</Link>
          </li>
        </ul>
      </aside>
    );
  }
}

export default SideBar;