import React, { lazy, Suspense } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import uuid from "uuid/v4";
import { ClipLoader } from "react-spinners";
import Button from "@material-ui/core/Button";

// lazyload
const Article = lazy(() => import("../Components/Article"));

export default class ViewAllArticles extends React.Component {
  state = {
    articles: [],
    user: {},
    paginationOffset: 0
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
        .get(
          `https://suicide-watch-backend.herokuapp.com/articles?limit=100&offset=${this.state.paginationOffset}`
        )
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px 0",
          flexDirection: "column"
        }}
      >
        <Suspense fallback={<ClipLoader />}>
          {this.state.articles.map(article => {
            return (
              <Route
                key={uuid()}
                render={props => (
                  <Suspense fallback={""}>
                    <Article article={article} {...props} />
                  </Suspense>
                )}
              />
            );
          })}
        </Suspense>
      </div>
    );
  }
}
