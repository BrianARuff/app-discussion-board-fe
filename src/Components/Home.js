import React from "react";
import { Route } from "react-router-dom";
import Register from "./Register";
import axios from "axios";
import "../styles/home.css";

export default class Home extends React.Component {
  state = {
    status: "Loading",
    user: {},
    isValid: false,
    image: ""
  }

  async componentDidMount() {
    this.setState({ status: "Loading" });
    const payload = await window.cookieStore.get("token") || "";

    if (payload.name) {
      const bearerToken = payload.value.split(".")[1];
      const payloadData = JSON.parse(atob(bearerToken));
      this.setState({ status: "Loaded", isValid: true, user: payloadData });
      console.log('good', this.state);
    } else {
      this.setState({ status: "", isValid: false, user: {} });
      console.log('err', this.state);
    }

    axios.get(`https://suicide-watch-backend.herokuapp.com/users/byname/${this.state.user.name}`)
      .then(res => {
        this.setState({ image: res.data.image })
      })
      .catch(err => 1);
  }

  render() {
    return (
      <div className="home-flex-box">
        {
          !this.state.isValid ? <Route render={(props) => <Register {...props} />} /> || "Not correctly Logged in." :
            this.state.status === "Loading" ? (
              <React.Fragment>
                <h4>Loading...</h4>
              </React.Fragment>
            ) :
              <div className="home-flex-box">
                <h1 className="hide">Home Page</h1>
                <h2 className="fw-bold">Welcome to the Home Page / Your User Profile (for now...)</h2>
                {
                  this.state.image ?
                    <img
                      style={{ width: "300px" }}
                      className="homeImage"
                      src={this.state.image}
                      alt={this.state}
                    /> :
                    <p className="fw-light">No image provided :(</p>
                }
                <p>
                  <span className="fw-bold">Name:</span> {this.state.user.name}
                </p>
                <p>
                  <span className="fw-bold">Email:</span> {this.state.user.email}
                </p>
                <p>
                  <span className="fw-bold">Description:</span> {this.state.user.description}
                </p>
              </div> || <p>You were able to authenticate into the application, but somehow managed to reach this fall back space. Please logout and login again or register a new account.</p>
        }
      </div>
    )
  }
}