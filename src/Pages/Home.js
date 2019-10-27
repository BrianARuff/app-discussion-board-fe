import React from "react";
import { Route } from "react-router-dom";
import Login from "./Login.js";
import MyArticles from "../Components/MyArticles.js";
import axios from "axios";
import "../styles/home.css";
import { Grid } from "@material-ui/core";
import { ClipLoader } from "react-spinners";
import DefaultImage from "../Images/defaultAvatar.png";

export default class Home extends React.Component {
  state = {
    status: "Loading",
    user: {},
    isValid: false,
    image: ""
  };

  async componentDidMount() {
    this.setState({ status: "Loading" });
    const payload = (await document.cookie.split("=")[1]) || "";
    if (payload.length > 0) {
      const bearerToken = payload.split(".")[1];
      const payloadData = JSON.parse(atob(bearerToken || ""));
      this.setState({ status: "Loaded", isValid: true, user: payloadData });
    } else {
      this.setState({ status: "", isValid: false, user: {} });
    }

    try {
      const user = await axios.get(
        `https://suicide-watch-backend.herokuapp.com/users/${this.state.user.id}`
      );

      if (!user) {
        this.setState({ status: "Error Loading Image" });
      } else {
        this.setState({
          image: user.data.image || DefaultImage,
          id: user.data.id
        });
      }
    } catch (error) {
      this.setState({ status: "Error Loading Image" });
      console.error(error);
    }
  }

  render() {
    return (
      <div className="pd-2" style={{ maxWidth: "600px", margin: "0 auto" }}>
        {!this.state.isValid ? (
          <Route render={props => <Login {...props} />} /> ||
          "Not correctly Logged in."
        ) : this.state.status === "Loading" ? (
          <React.Fragment>
            <ClipLoader />
          </React.Fragment>
        ) : (
          <div>
            <h1 className="hide">Home Page</h1>
            {this.state.image ? (
              <img
                style={{
                  width: "300px",
                  margin: "20px"
                }}
                className="homeImage"
                src={this.state.image}
                alt={this.state}
              />
            ) : (
              <div className="fw-light">
                <ClipLoader />
              </div>
            )}
            <Grid container alignItems="flex-start" justify="space-evenly">
              <Grid item>
                <span className="fw-bold"></span> {this.state.user.description}
              </Grid>
            </Grid>
            <br />
            <br />
            <Route
              render={props => (
                <MyArticles image={this.state.image} {...props} />
              )}
            />
          </div>
        )}
      </div>
    );
  }
}
