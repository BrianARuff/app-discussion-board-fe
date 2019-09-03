import React from "react";
import { Link } from "react-router-dom";
import { InputLabel, FormHelperText, Input, FormControl, Button } from "@material-ui/core";
import LoopIcon from '@material-ui/icons/Loop';
import axios from "axios";
import Cookie from "js-cookie";
import "../styles/loggin.css";

export default class Login extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    status: "Login"
  }

  spinnerRef = React.createRef();

  componentDidMount() {
    this.spinnerRef.current.className = "hide";
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  loginUser = () => {
    this.spinnerRef.current.className = "spin";
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
        window.scrollTo({
          top: 0,
          behavior: "auto"
        });
        this.spinnerRef.current.className = "hide";
      })
      .catch(err => {
        console.error(this.status, err);
        this.setState({status: "Failed to authenticate your account please try again..."});
        this.spinnerRef.current.className = "hide";
      });
  }

  loginUserEnter = (e) => e.key === "Enter" ? this.loginUser() : null;

  render() {
    return (
      <div className="login-form-container">
        <h1 className="hide">Login Page</h1>
        <h2 className="fw-bold">Login Below</h2>
        <h4 className="fw-light">Login with either your email or username in the appropriate field</h4>
        <form 
          onKeyDown={(e) => this.loginUserEnter(e)} className="login-form-flex">
          <FormControl fullWidth required>
            <InputLabel>
              Username
            </InputLabel>
            <Input autoComplete="true" name="name" type="text" onChange={this.handleInputChange} />
            <FormHelperText>Fill out either your username</FormHelperText>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel>
              Email
            </InputLabel>
            <Input autoComplete="true" name="email" type="email" onChange={this.handleInputChange} />
            <FormHelperText>Fill out either your email</FormHelperText>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel>
              Password
            </InputLabel>
            <Input autoComplete="true"  name="password" type="password" onChange={this.handleInputChange} />
            <FormHelperText>Please enter your password</FormHelperText>
          </FormControl>

          <br />
          <FormControl fullWidth>
            <Button
              onClick={this.loginUser}
              fullWidth
              color="secondary"
              variant="contained"
            >
              <span style={{position: "relative", left: -10, paddingTop: "5px"}} ref={this.spinnerRef} className={this.state.spinner}><LoopIcon /></span>

              {this.state.status}
            </Button>
            <FormHelperText>Don't have an account? Head over to the <Link to="/register">Register</Link> page to register your new account!!</FormHelperText>
          </FormControl>
        </form>
      </div>
    )
  }
}