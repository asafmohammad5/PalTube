import React, { Component } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import SearchBar from './ui/SearchBar';
import { initializeTheme } from '../util/util';


class NavBar extends Component {


  toggleMenu = ()=>{
    let sideBar = document.getElementsByClassName("sidebar")[0];
    let miniSideBar = document.getElementsByClassName("mini-sidebar")[0];
    let toggleClassSide = sideBar.classList.contains('show') ? "hide": "show";
    let toggleClassMini = miniSideBar.classList.contains('show') ? "hide" : "show";
    miniSideBar.classList.remove('show');
    miniSideBar.classList.remove('hide');
    miniSideBar.classList.add(toggleClassMini);
    sideBar.classList.remove('show');
    sideBar.classList.remove('hide');
    sideBar.classList.add(toggleClassSide);
  }

  render(){
    initializeTheme();
    let src = localStorage.theme === "dark" ? window.darkTheme : window.lightTheme;
    return (
      <div className="navbar">
        <div className="logo-container">
          <span onClick={this.toggleMenu} className="burger-menu-icon" id="nav-toggle">&#9776;</span>
          <Link to="/"><img id="site-logo" className="navbar-logo" src={src} alt="Paltube" /></Link>
        </div>
        <SearchBar />
        <Nav />
      </div>
    );
  }
  
};

export default NavBar; 