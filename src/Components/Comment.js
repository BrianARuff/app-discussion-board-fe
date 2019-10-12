import React from "react";

export default class Comment extends React.Component {
  render() {
    return (
      <div style={{ border: "1px solid black" }} className="comment-container">
        <h4 className="posted-by">Author{this.props.comment.author}</h4>
        <p>{this.props.comment.text}</p>
        <div className="post-info">
          {" "}
          <span style={{ margin: "0 1.6rem" }} className="likes">
            {this.props.comment.likes}
          </span>{" "}
          ||
          <span style={{ margin: "0 1.6rem" }} className="dislikes">
            {this.props.comment.dislikes}
          </span>
        </div>
      </div>
    );
  }
}
