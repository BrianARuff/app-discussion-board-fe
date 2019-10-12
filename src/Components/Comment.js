import React from "react";

export default class Comment extends React.Component {
  render() {
    return (
      <div className="comment-container">
        <h4 className="posted-by">{this.props.comment.author}</h4>
        <p>{this.props.comment.text}</p>
        <div className="post-info">
          {" "}
          <span className="likes">{this.props.comment.likes}</span>
          <span className="dislikes">{this.props.comment.dislikes}</span>
        </div>
      </div>
    );
  }
}
