import React, { Component } from 'react';
import { currentUser } from '../../util/util'

class SideBar extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    let profileSrc = currentUser() ? currentUser().image : "/stylesheets/images/default_avatar_2.png";
    return (
      <aside className="sidebar show">
        <img src={profileSrc} className=""/>
        <ul>
          <li></li>
        </ul>
      </aside>
    );
  }
}

export default SideBar;