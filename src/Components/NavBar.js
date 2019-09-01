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
  constructor(props) {
    super(props);
    this.state = {
      isValid: false
    }
  }

  async UNSAFE_componentWillMount() {
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

                    {/* New Article
                      ********************
                      ********************
                      ********************
                TODO: CREATE ARTICLE FUNCTIONALITY
                      ********************
                      ********************
                      ********************
                    */}
                    <NavLink
                      activeClassName="nav-button-active"
                      className="nav-buttons"
                      exact to="/">
                      <Button
                        onClick={this.handleUpdateUrl}
                        color="inherit">
                        Create Content
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

                  </React.Fragment>
                ) : // logged out state below
                (
                  <React.Fragment>
                    {/* LOGO */}
                    <NavLink
                      className="nav-buttons"
                      exact to="/">
                      <Button
                        color="inherit">
                        SW
                        </Button>
                    </NavLink>

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
