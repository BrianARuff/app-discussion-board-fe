import React from "react";
import axios from "axios";
import Article from "../Components/Article";
import uuid from "uuid/v4";
import { Route } from "react-router-dom";

export default class MyArticles extends React.Component {

  state = {
    articles: [],
    user: {}
  }


  // validate account...
  async componentDidMount() {
    this.setState({ status: "Loading" });
    const payload = await window.cookieStore.get("token") || "";

    if (payload.name) {
      const bearerToken = payload.value.split(".")[1];
      const payloadData = JSON.parse(atob(bearerToken));
      this.setState({ user: payloadData });
    } else {
      this.setState({ user: {} });
    }

    axios.get(`https://suicide-watch-backend.herokuapp.com/users/articles/${this.state.user.id}`)
      .then(res => {
        this.setState({ articles: res.data.articles });
      })
      .catch(err => {
        this.setState({ articles: [] });
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h2 className="fw-bold">My Article List</h2>
        {
          (this.state.articles || []).map(article => {
            return (
              <Route
                key={uuid()}
                render={props =>
                  <Article
                    image={this.props.image}
                    user={this.state.user}
                    article={article}
                    {...props}
                  />
                }
              />
            )
          })
        }
      </div>
    )
  }
}