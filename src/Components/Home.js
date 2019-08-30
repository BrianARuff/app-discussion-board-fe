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

  static async componentDidMount() {
    const payload = window.cookieStore.get("token") || "";

    if (payload.name) {
      const bearerToken = payload.value.split(".")[1];
      const payloadData = JSON.parse(atob(bearerToken));
      this.setState({ isValid: true, user: payloadData });
      console.log('good', this.state);
    } else {
      this.setState({ isValid: false, status: "", user: {} });
      console.log('err', this.state);
    }

    axios.get(`https://suicide-watch-backend.herokuapp.com/users/byname/${this.state.user.name}`)
    .then(res => {
      this.setState({image: res.data.image})
    })
    .catch(err => console.error(err));
  }

  render() {
    return (
      <React.Fragment>
        {
          !this.state.isValid ? <Route render={(props) => <Register {...props} />} /> || "Not correctly Logged in." :
            this.state.status ?
              "Loading..."
            <div className="home-flex-box">
              <h2>Welcome to the Home Page / Your User Profile (for now...)</h2>
              this.status
              {
                this.state.image ?
                  <img 
                  style={{width: "300px"}} 
                  className="homeImage"
                  src={this.state.image}
                  alt={this.state}
                  />:
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