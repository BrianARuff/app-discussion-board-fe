import React, { lazy, Suspense } from "react";
import axios from "axios";
import uuid from "uuid/v4";
import { Route } from "react-router-dom";
import { ClipLoader } from "react-spinners";

// lazy loaded components
const Article = lazy(() => import("../Components/Article"));

export default class MyArticles extends React.Component {
  state = {
    articles: [],
    user: {}
  };

  // validate account...
  async componentDidMount() {
    // =====
    this.setState({ status: "Loading" });
    const payload = (await document.cookie.split("=")[1]) || "";
    if (payload.length > 0) {
      const bearerToken = payload.split(".")[1];
      const payloadData = JSON.parse(atob(bearerToken));
      this.setState({ user: payloadData });
    } else {
      this.setState({ user: {} });
    }

    axios
      .get(
        `https://discussion-site.herokuapp.com/users/articles/${this.state.user.id}`
      )
      .then(res => {
        this.setState({ articles: res.data.articles });
      })
      .catch(err => {
        this.setState({ articles: [] }, () => {
          console.log(err);
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        <h2 className="fw-bold">My Article List</h2>
        <Suspense fallback={<ClipLoader />}>
          {(this.state.articles || []).map((article, index) => {
            return (
              <Route
                key={uuid()}
                render={props => (
                  <Article
                    image={this.props.image}
                    user={this.state.user}
                    article={article}
                    {...props}
                  />
                )}
              />
            );
          })}
        </Suspense>
      </React.Fragment>
    );
  }
}
