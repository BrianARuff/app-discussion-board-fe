import React from "react";
import axios from "axios";
import Article from "../Components/Article";
import { Route } from "react-router-dom";
import uuid from "uuid/v4";

export default class ViewAllArticles extends React.Component {
  state = {
    articles: [],
    user: {}
  };

  // validate account...
  async componentDidMount() {
    this.setState({ status: "Loading" });
    const payload = (await document.cookie.split("=")[1]) || "";
    if (payload.length > 0) {
      const bearerToken = payload.split(".")[1];
      const payloadData = JSON.parse(atob(bearerToken));
      this.setState({ user: payloadData });

      axios
        .get("https://suicide-watch-backend.herokuapp.com/articles/")
        .then(res => {
          this.setState({ articles: res.data.articles });
        })
        .catch(err => {
          this.setState({ articles: [] });
          console.error(err);
        });
    } else {
      this.setState({ user: {} });
    }
  }

  render() {
    return (
      <div>
        {this.state.articles.map(article => {
          return (
            <Route
              key={uuid()}
              render={props => <Article article={article} {...props} />}
            />
          );
        })}
      </div>
    );
  }
}
