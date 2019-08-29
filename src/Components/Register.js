import React from "react";
import { InputLabel, FormHelperText, Input, FormControl } from "@material-ui/core";
import RemoveRedEye from "@material-ui/icons/RemoveRedEye";
import "../styles/register.css";
export default class Register extends React.Component {
  render() {
    return (
      <div className="register-form-container">
        <h1>Register Below</h1>
        <div className="register-form-flex">
          <FormControl fullWidth required>
            <InputLabel>
              Username
              </InputLabel>
            <Input type="text" />
            <FormHelperText>Please enter a username that you are comfortable using and can remember</FormHelperText>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel>
              Email
            </InputLabel>
            <Input type="email" />
            <FormHelperText>Please enter a valid email address that you can keep up with</FormHelperText>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel>
              Password
            </InputLabel>
            <Input type="password" />
            <FormHelperText>Please enter a strong password that you can remember</FormHelperText>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel>
              Please enter your password again
            </InputLabel>
            <Input type="password" />
            <FormHelperText>Please enter a strong password that you can remember</FormHelperText>
          </FormControl>

          <FormControl fullWidth >
            <InputLabel /> {/* DOB */}
            <Input type="date" />
            <FormHelperText>Please enter a valid email address that you can keep up with</FormHelperText>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>
              Description
            </InputLabel>
            <Input type="text" />
            <FormHelperText>Please tell us about yourself, if you want.</FormHelperText>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>
            </InputLabel>
            <Input type="file" />
            <FormHelperText>Image uploader under construction</FormHelperText>
          </FormControl>
          
        </div>
      </div>
    )
  }
}