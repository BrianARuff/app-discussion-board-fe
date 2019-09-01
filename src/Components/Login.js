import React from "react";
import { Link } from "react-router-dom";
import { InputLabel, FormHelperText, Input, FormControl, Button } from "@material-ui/core";
import axios from "axios";
import Cookie from "js-cookie";
import "../styles/loggin.css";

export default class Login extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    status: "Register"
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  loginUser = () => {
    const { name, email, password } = this.state;
    this.setState({status: "Validating Credentials"});
    axios.post("https://suicide-watch-backend.herokuapp.com/auth/login", {name, email, password})
      .then(res => {
        Cookie.set("token", res.data.token, {
          expires: 7,
          path: "/"
        });
        this.setState({status: "Authentication successful"});
        this.props.history.push('/');
        window.location.reload();
      })
      .catch(err => {
        console.error(this.status, err);
        this.setState({status: "Failed to authenticate your account please try again..."});
      });
  }

  render() {
    return (
      <div className="login-form-container">
        <h1 className="hide">Login Page</h1>
        <h2 className="fw-bold">Login Below</h2>
        <h4 className="fw-light">Fill out either your email <b>or</b> username, not both.</h4>
        <div className="login-form-flex">
          <FormControl fullWidth required>
            <InputLabel>
              Username
            </InputLabel>
            <Input name="name" type="text" onChange={this.handleInputChange} />
            <FormHelperText>Fill out either your email or password.</FormHelperText>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel>
              Email
            </InputLabel>
            <Input name="email" type="email" onChange={this.handleInputChange} />
            <FormHelperText>Fill out either your email or password</FormHelperText>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel>
              Password
            </InputLabel>
            <Input name="password" type="password" onChange={this.handleInputChange} />
            <FormHelperText>Please enter a strong password that you can remember</FormHelperText>
          </FormControl>

          <br />
          <FormControl fullWidth>
            <Button
              onClick={this.loginUser}
              fullWidth
              color="secondary"
              variant="contained"
            >
              {this.state.status}
            </Button>
            <FormHelperText>Not yet a member? That is okay! Please head over to the <Link to="/register">Register</Link> page to register your new account!!</FormHelperText>
          </FormControl>
        </div>
      </div>
    )
  }
}