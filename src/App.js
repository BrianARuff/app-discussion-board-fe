import React from 'react';
import './App.css';
import { Route } from "react-router-dom";
import Login from "./Components/Login.js";
import NavBar from "./Components/NavBar.js";
import Home from "./Components/Home.js";
import Register from "./Components/Register.js";
import LoggedOut from './Components/LoggedOut';


export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Route exact path="/login" render={props => <Login {...props} />} />
        <Route exact path="/register" render={props => <Register {...props} />} />
        <Route exact path="/" render={props => <Home {...props} />} />
        <Route exact path="/logout" render={props => <LoggedOut {...props} />} />
      </div>
    );
  }
}

