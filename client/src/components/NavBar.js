import React, { Component } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import SearchBar from './ui/SearchBar';
import { initializeTheme, getCurrentTheme } from '../util/util';


class NavBar extends Component {

  // componentDidMount(){
  //   initializeTheme();
  // }

  toggleMenu = ()=>{
    let sideBar = document.getElementsByClassName("sidebar")[0];
    let toggleClass = sideBar.classList.contains('show') ? "hide": "show";
    sideBar.classList.remove('show');
    sideBar.classList.remove('hide');
    sideBar.classList.add(toggleClass);
  }

  render(){
    initializeTheme();
    let src = localStorage.theme === "dark" ? window.darkTheme : window.lightTheme;
    return (
      <div className="navbar">
        <div className="logo-container">
          <span onClick={this.toggleMenu} className="burger-menu-icon" id="nav-toggle">&#9776;</span>
          <Link to="/"><img id="site-logo" className="navbar-logo" src={src} /></Link>
        </div>
        <SearchBar />
        <Nav />
      </div>
    );
  }
  
};

export default NavBar; 