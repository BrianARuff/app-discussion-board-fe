import React from "react";
import "../styles/comments.css";
import axios from "axios";
import Comment from "../Components/Comment";
import { ClipLoader } from "react-spinners";

export default class Comments extends React.Component {
  state = {
    comments: [],
    hasError: false,
    status: "Loading"
  };
  componentDidMount() {
    axios
      .get(
        `https://suicide-watch-backend.herokuapp.com/comments/article/${this.props.article.id}`
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
          <ul className="comment-list">
            {this.state.comments.length < 1 ? (
              <h4>No Comments :(</h4>
            ) : (
              (this.state.comments.map || []).map(comment => {
                return <Comment comment={comment} />;
              })
            )}
          </ul>
        )}
      </React.Fragment>
    );
  }
}
