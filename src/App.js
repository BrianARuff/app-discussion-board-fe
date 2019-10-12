import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

// pages
import Login from "./Pages/Login.js";
import Home from "./Pages/Home.js";
import Register from "./Pages/Register.js";
import LoggedOut from "./Pages/LoggedOut";
import CreateContent from "./Pages/CreateContent";
import ViewAllArticles from "./Pages/ViewAllArticles";
import PageNotFound from "./Pages/PageNotFound";
import ArticlePage from "./Pages/ArticlePage";

// components
import NavBar from "./Components/NavBar.js";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" render={props => <Home {...props} />} />
          <Route exact path="/login" render={props => <Login {...props} />} />
          <Route
            exact
            path="/register"
            render={props => <Register {...props} />}
          />
          <Route
            exact
            path="/logout"
            render={props => <LoggedOut {...props} />}
          />
          <Route
            exact
            path="/createContent"
            render={props => <CreateContent {...props} />}
          />
          <Route
            exact
            path="/articles"
            render={props => <ViewAllArticles {...props} />}
          />
          <Route
            exact
            path="/article/:id"
            render={props => <ArticlePage {...props} />}
          />
          <Route path="*" render={props => <PageNotFound {...props} />} />
        </Switch>
      </div>
    );
  }
}
