import React from "react";
import { NavLink } from "react-router-dom";
import Cookie from "js-cookie";

// custom styles
import "../styles/navbar.css";

// material ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

export default class NavBar extends React.Component {
  state = {
    isValid: false
  }

  async componentDidMount() {
    const payload = await document.cookie.split("=")[1] || "";
    console.log("Navbar Component\n", "\nPayload:", payload);
    if (payload.length > 0) {
      const bearerToken = payload.split(".")[1];
      const payloadData = JSON.parse(atob(bearerToken));
      this.setState({ user: payloadData });
      console.log(bearerToken, payloadData);
    } else {
      console.log("No Payload in Navbar")
    }
    if (payload.length > 0) {
      this.setState({ isValid: true });
    } else {
      this.setState({ isValid: false });
    }
  }

  logout = () => {
    Cookie.remove("token");
    localStorage.removeItem("username");
    localStorage.removeItem("image");
    window.location.href = window.location.origin;
  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar className="navigation">
            {
              this.state.isValid ?
                (
                  <div className="nav-bar-container mobile-nav-bar-container">
                    {/* LOGO */}
                    <NavLink
                      className="nav-buttons"
                      exact
                      to="/"><Button color="inherit">SW</Button></NavLink>

                    {/* LOGO */}
                    <NavLink
                      activeClassName="nav-button-active"
                      className="nav-buttons"
                      exact to="/">
                      <Button
                        onClick={this.handleUpdateUrl}
                        color="inherit">
                        Home
                      </Button>
                    </NavLink>

                    {/* VIEW ARTICLES */}
                    <NavLink
                      activeClassName="nav-button-active"
                      className="nav-buttons"
                      exact to="/articles">
                      <Button
                        onClick={this.handleUpdateUrl}
                        color="inherit">
                          Articles
                      </Button>
                    </NavLink>                     

                    {/* CREATE CONTENT */}
                    <NavLink
                      activeClassName="nav-button-active"
                      className="nav-buttons"
                      exact to="/createContent">
                      <Button
                        onClick={this.handleUpdateUrl}
                        color="inherit">
                        Create an Article
                      </Button>
                    </NavLink>                   

                    {/* LOGOUT */}
                    <NavLink
                      activeClassName="nav-button-active"
                      className="nav-buttons"
                      exact to="/logout">
                      <Button
                        onClick={this.logout}
                        color="inherit">
                        Logout
                      </Button>
                    </NavLink>

                  </div>
                ) : // logged out state below
                (
                  <React.Fragment>
                    <span></span>
                    {/* LOGIN */}
                    <NavLink
                      activeClassName="nav-button-active" className="nav-buttons"
                      exact
                      to="/login">
                      <Button
                        onClick={this.handleUpdateUrl} color="inherit">
                        Login
                        </Button>
                    </NavLink>

                    <NavLink
                      activeClassName="nav-button-active"
                      className="nav-buttons"
                      exact
                      to="/register">
                      <Button
                        onClick={this.handleUpdateUrl} color="inherit">
                        Register
                        </Button>
                    </NavLink>
                  </React.Fragment>
                )
            }
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
