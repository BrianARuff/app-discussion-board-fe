import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../styles/loggedoutpage.css";
import Cookies from "js-cookie";

export default class LoggedOut extends React.Component {
  state = {

  }

  static getDerivedStateFromProps(props, state) {
    Cookies.remove("token");
    localStorage.removeItem("username");
    localStorage.removeItem("image");
    return state;
  }

  render() {
    return (
      <div className="logout-page-flex">
        <h1 className="hide">Loggedout Page</h1>
        <h2 className="fw-bold">Logged Out!</h2>
        <p className="fw-light">Thank you for visiting our website. Please return and interact with us again. We love and care about you! We built this website using the latest and greatest web technologies to prove it. It is also a way for us to improve our personal web development skills, so it is a win-win siutuation!!</p>
        <Grid 
          container 
          spacing={1}>
          <Grid 
            xs={6} 
            item>
            <Link 
              to="/login"
              className="loggedout-login-link"
              >
                <Button 
                  color="primary" 
                  variant="contained" 
                  fullWidth>
                    Login
                </Button>
            </Link>
          </Grid>
          <Grid xs={6} item>
            <Link 
              to="/register"
              className="loggedout-register-link"
              >
                <Button 
                  color="secondary" 
                  variant="contained" fullWidth>
                    Register
                </Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    )
  }
}