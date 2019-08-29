import React from "react";
import { InputLabel, FormHelperText, Input, FormControl, TextField } from "@material-ui/core";
import RemoveRedEye from "@material-ui/icons/RemoveRedEye";
import "../styles/register.css";
export default class Register extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    validatePSW: "",
    date_of_birth: "",
    description: "",
    image: ""
  }

  handleInputChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
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

          <FormControl fullWidth required>
            <InputLabel>
              Please enter your password again
            </InputLabel>
            <Input name="validatePSW" type="password" onChange={this.handleInputChange} />
            <FormHelperText>Please enter a strong password that you can remember</FormHelperText>
          </FormControl>

          <FormControl fullWidth >
            <InputLabel /> {/* DOB */}
            <Input name="date_of_birth" type="date" onChange={this.handleInputChange}/>
            <FormHelperText>Please enter a valid email address that you can keep up with</FormHelperText>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>
              Description
            </InputLabel>
            <Input name="description" type="text" onChange={this.handleInputChange} />
            <FormHelperText>Please give us a short description about yourself, if you want.</FormHelperText>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>
            </InputLabel>
            <Input name="image" type="file" onChange={this.handleInputChange} />
            <FormHelperText>Image uploader under construction</FormHelperText>
          </FormControl>
        </div>
      </div>
    )
  }
}