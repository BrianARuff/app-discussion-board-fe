import React from "react";
import { Route } from "react-router-dom";
import Register from "./Register";
import "../styles/home.css";

export default class Home extends React.Component {
  state = {
    status: "Loading",
    user: {},
    isValid: false
  }
  async componentWillMount() {
    const payload = await window.cookieStore.get("token") || "";

    if (payload.name) {
      const bearerToken = payload.value.split(".")[1];
      const payloadData = JSON.parse(atob(bearerToken));
      this.setState({ isValid: true, user: payloadData });
      console.log('good', this.state);
    } else {
      this.setState({ isValid: false, status: "", user: {} });
      console.log('err', this.state);
    }
  }

  render() {
    return (
      <React.Fragment>
        {
          !this.state.isValid ? <Route render={(props) => <Register {...props} />} /> || "Not correctly Logged in." :
            <div className="home-flex-box">
              <h2>Welcome to the Home Page / Your User Profile (for now...)</h2>
              {
                this.state.user.image ?
                  <img src={this.state.user.image} /> :
                  null
              }
              <p>
                <b>Name:</b> {this.state.user.name}
              </p>
              <p>
                <b>Email:</b> {this.state.user.email}
              </p>
              <p>
                <b>Description:</b> {this.state.user.description}
              </p>
            </div> || "You are registered and logged in, but something is broken and this a fall back to keep you from seeing errors on the page. Please report this error and we will fix it ASAP."
        }
      </React.Fragment>
    )
  }
}