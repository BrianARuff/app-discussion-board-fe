import React from "react";
import "../styles/comments.css";
import axios from "axios";
import Comment from "../Components/Comment";

export default class Comments extends React.Component {
  state = {
    comments: []
  };
  componentDidMount() {
    axios
      .get(
        `https://suicide-watch-backend.herokuapp.com/comments/article/${this.props.article.id}`
      )
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <React.Fragment>
        <ul className="comment-list">
          {this.state.comments.length < 1 ? (
            <h4>No Comments :(</h4>
          ) : (
            (this.state.comments.map || []).map(comment => {
              return <Comment comment={comment} />;
            })
          )}
        </ul>
      </React.Fragment>
    );
  }
}
