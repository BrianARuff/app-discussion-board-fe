import React, { lazy, Suspense } from "react";
import "../styles/comments.css";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import uuid from "uuid/v4";

// lazy load
const Comment = lazy(() => import("../Components/Comment"));

export default class Comments extends React.Component {
  state = {
    comments: [],
    hasError: false,
    status: "Loading"
  };
  componentDidMount() {
    axios
      .get(
        `https://discussion-site.herokuapp.com/comments/article/${this.props.article.id}`
      )
      .then(res => {
        this.setState({
          comments: res.data.comments,
          status: "Complete",
          hasError: false
        });
      })
      .catch(err =>
        this.setState(
          { comments: [], hasError: true, status: "Complete" },
          () => console.log(JSON.stringify(err, null, 4))
        )
      );
  }

  render() {
    return (
      <React.Fragment>
        {this.state.status === "Loading" ? (
          <React.Fragment>
            <h4>Loading</h4>
            <ClipLoader />
          </React.Fragment>
        ) : (
          <Suspense fallback={<ClipLoader />}>
            <ul
              style={{ width: "100%", padding: "0", margin: "0" }}
              className="comment-list"
            >
              {this.state.comments.length < 1 ? (
                <h4>No Comments :(</h4>
              ) : (
                (this.state.comments || []).map(comment => {
                  return <Comment key={uuid()} comment={comment} />;
                })
              )}
            </ul>
          </Suspense>
        )}
      </React.Fragment>
    );
  }
}
