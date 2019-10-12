import React from "react";

export default class Comment extends React.Component {
  render() {
    return (
      <div className="comment-container">
        <h4>{this.props.comment.title}</h4>
        <p>{this.props.comment.text}</p>
        <p>
          <span className="posted-by">{this.props.comment.author}</span>
          <span className="likes">{this.props.comment.likes}</span>
          <span className="dislikes">{this.props.comment.dislikes}</span>
        </p>
      </div>
    );
  }
}
