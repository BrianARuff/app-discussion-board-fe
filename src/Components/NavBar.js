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

  static async componentWillMount() {
    const payload = await window.cookieStore.get("token") || "";

    if (payload.name) {
      this.setState({ isValid: true });
    } else {
      this.setState({ isValid: false });
    }
  }

  logout = () => {
    Cookie.remove("token");
    localStorage.removeItem("username");
    localStorage.removeItem("image");
  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar className="navigation">

            {
              this.state.isValid ?
                (
                  <React.Fragment>

                    <NavLink
                      className="nav-buttons"
                      exact
                      to="/"><Button color="inherit">SW</Button></NavLink>

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

                  </React.Fragment>
                ) :
                (
                  <React.Fragment>
                    <NavLink
                      className="nav-buttons"
                      exact to="/">
                      <Button
                        color="inherit">
                        SW
                        </Button>
                    </NavLink>

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
