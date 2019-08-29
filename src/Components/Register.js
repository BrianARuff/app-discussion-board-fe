import React from "react";
import { Link } from "react-router-dom";
import { InputLabel, FormHelperText, Input, FormControl, Button } from "@material-ui/core";
import { StyledDropZone } from 'react-drop-zone'
import 'react-drop-zone/dist/styles.css';
import axios from "axios";
import Cookie from "js-cookie";

import "../styles/register.css";
export default class Register extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    date_of_birth: "",
    description: "",
    image: "",
    role: "member",
    status: "Register"
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  registerUser = () => {
    this.setState({status: "registering"});
    axios.post("https://suicide-watch-backend.herokuapp.com/auth/register", this.state)
      .then(res => {
        localStorage.setItem("username", res.data.user.name);
        Cookie.set("token", res.data.token, {
          expires: 7,
          path: "/"
        });
        this.setState({status: "Registered"});
        this.props.history.push('/');
      })
      .catch(err => {
        console.error(this.setState({status: "registering"}));
        this.setState({status: "Error registering account... Try again."});
      });
  }

  render() {
    return (
      <div className="register-form-container">
        <h1>Register Below</h1>
        <div className="register-form-flex">
          <FormControl fullWidth required>
            <InputLabel>
              Username
              </InputLabel>
            <Input name="name" type="text" onChange={this.handleInputChange} />
            <FormHelperText>Please enter a username that you are comfortable using and can remember</FormHelperText>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel>
              Email
            </InputLabel>
            <Input name="email" type="email" onChange={this.handleInputChange} />
            <FormHelperText>Please enter a valid email address that you can keep up with</FormHelperText>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel>
              Password
            </InputLabel>
            <Input name="password" type="password" onChange={this.handleInputChange} />
            <FormHelperText>Please enter a strong password that you can remember</FormHelperText>
          </FormControl>

          <FormControl fullWidth >
            <InputLabel />
            <Input name="date_of_birth" type="date" onChange={this.handleInputChange} />
            <FormHelperText>Please enter a valid email address that you can keep up with</FormHelperText>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>
              Description
            </InputLabel>
            <Input name="description" type="text" onChange={this.handleInputChange} />
            <FormHelperText>Please give us a short description about yourself, if you want.</FormHelperText>
          </FormControl>

          <br />
          <StyledDropZone label="Select or Drop your image here" onDrop={(file, text) => {
            const reader = new FileReader();
            reader.onload = upload => {
              this.setState({ image: upload.srcElement.result });
            };
            reader.readAsDataURL(file);
          }}>
          </StyledDropZone>

          <br />
          <FormControl fullWidth>
            <Button
              onClick={this.registerUser}
              fullWidth
              color="secondary"
              variant="contained"
            >
              {this.state.status}
            </Button>
            <FormHelperText>Already registered? Please go <Link to="/login">Login</Link> to login.</FormHelperText>
          </FormControl>
        </div>
      </div>
    )
  }
}