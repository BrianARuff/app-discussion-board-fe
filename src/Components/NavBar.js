import React from "react";
import { NavLink, Link } from "react-router-dom";

// custom styles
import "../styles/navbar.css";

// material ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


export default class NavBar extends React.Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar className="navigation">
            
            <Link activeClassName="nav-button-active" className="nav-buttons" exact to="/"><Button color="inherit">Suicide Watch <span className="rarr">&rarr;</span> Home Page</Button></Link>

            <NavLink activeClassName="nav-button-active" className="nav-buttons" exact to="/login"><Button color="inherit">Login</Button></NavLink>

            <NavLink activeClassName="nav-button-active" className="nav-buttons" exact to="/register"><Button color="inherit">Register</Button></NavLink>

            <NavLink activeClassName="nav-button-active" className="nav-buttons" exact to="/"><Button color="inherit">Home</Button></NavLink>

          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

