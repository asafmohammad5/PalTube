import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Query, ApolloConsumer } from "react-apollo";
import Queries from "../graphql/queries";
import Nav from "./Nav";
import SearchBar from './ui/SearchBar'
const { IS_LOGGED_IN } = Queries;

class NavBar extends Component {
  toggleMenu = ()=>{
    // debugger
    let sideBar = document.getElementsByClassName("sidebar")[0];
    let toggleClass = sideBar.classList.contains('show') ? "hide": "show";
    let removeClass = sideBar.classList.contains('show') ? "hide": "show";
    sideBar.classList.remove('show');
    sideBar.classList.remove('hide');
    // sideBar.setAttribute("class", toggleClass);
    sideBar.classList.add(toggleClass);
  }

  render(){
    return (
      <div className="navbar">
        <div>
           <img onClick={this.toggleMenu} src="/stylesheets/images/burger_menu.png" className="burger-menu-icon" />
        <Link to="/"><img className="navbar-logo" src="/stylesheets/images/paltube.png" /></Link>
        </div>
       
        <SearchBar />
        <Nav />
      </div>
    );
  }
  
};

export default NavBar; 