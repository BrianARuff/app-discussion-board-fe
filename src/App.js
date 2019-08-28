import React from 'react';
import './App.css';
import { Route } from "react-router-dom";
import Login from "./Components/Login.js";
import NavBar from "./Components/NavBar.js";
import Home from "./Components/Home.js";
import Register from "./Components/Register.js";


function App() {
  return (
    <div className="App">
      <NavBar />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/" component={Home} />
    </div>
  );
}

export default App;
