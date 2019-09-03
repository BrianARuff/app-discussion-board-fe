import React from "react";
import { Link } from "react-router-dom";
import { InputLabel, FormHelperText, Input, FormControl, Button } from "@material-ui/core";
import { StyledDropZone } from 'react-drop-zone'
import LoopIcon from '@material-ui/icons/Loop';
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
    status: "Register",
    dropZoneText: "Select or Drop your Profile Image Here"
  }

  spinnerRef = React.createRef();

  componentDidMount() {
    this.spinnerRef.current.className = "hide";
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  registerUser = () => {
    this.spinnerRef.current.className = "spin";
    this.setState({ status: "Registering" });
    axios.post("https://suicide-watch-backend.herokuapp.com/auth/register", this.state)
      .then(res => {
        Cookie.set("token", res.data.token, {
          expires: 7,
          path: "/"
        });
        this.setState({ status: "Registered" });
        this.props.history.push('/');
        window.location.reload();
        window.scrollTo({
          top: 0,
          behavior: "auto"
        });
        this.spinnerRef.current.className = "hide";
      })
      .catch(err => {
        this.setState({ status: "Error registering account... Try again." });
        this.spinnerRef.current.className = "hide";
      });
  }

  imageUploadProgress = e => {
    let progress = Math.round(e.loaded / e.total) * 100;
    if (progress < 100) {
      this.setState({dropZoneText: (progress + "%")});
    } else {
      this.setState({dropZoneText: "Your Profile Image was Uploaded"});
      this.spinnerRef.current.className = ""
    }
  }

  registerUserEnter = (e) => e.key === "Enter" ? this.registerUser() : null;

  render() {
    return (
      <div className="register-form-container">
        <h1 className="hide">Register Page</h1>
        <h2 className="fw-bold">Register Below</h2>
        <form onKeyDown={(e) => this.registerUserEnter(e)} className="register-form-flex">
          <FormControl fullWidth required>
            <InputLabel>
              Username
              </InputLabel>
            <Input autoComplete="true" name="name" type="text" onChange={this.handleInputChange} />
            <FormHelperText>Please enter your username</FormHelperText>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel>
              Email
            </InputLabel>
            <Input autoComplete="true" name="email" type="email" onChange={this.handleInputChange} />
            <FormHelperText>Please enter a valid email address that you can keep up with</FormHelperText>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel>
              Password
            </InputLabel>
            <Input autoComplete="true" name="password" type="password" onChange={this.handleInputChange} />
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
          <FormControl fullWidth>
            <StyledDropZone 
              label={this.state.dropZoneText}
              onDrop={(file, text) => {
                const reader = new FileReader();
                reader.onload = upload =>
                this.setState({ image: upload.srcElement.result });
                reader.onprogress = this.imageUploadProgress
                reader.readAsDataURL(file);
              }}>
            </StyledDropZone>
          </FormControl>

          <br />
          <FormControl fullWidth>
            <Button
              onClick={this.registerUser}
              fullWidth
              color="secondary"
              variant="contained"
            >
              <span style={{position: "relative", left: -10, paddingTop: "5px"}} ref={this.spinnerRef} className={this.state.spinner}><LoopIcon /></span>
              {this.state.status}
            </Button>
            <FormHelperText>Already registered? Please go <Link to="/login">Login</Link> to login.</FormHelperText>
          </FormControl>
        </form>
      </div>
    )
  }
}