import React from "react";

export default class Comments extends React.Component {
  state = {
    comments: []
  };
  render() {
    return (
      <React.Fragment>
        <hr />
        <ul className="comment-list">
          {this.state.comments.length < 1 ? (
            <h4>No Comments :(</h4>
          ) : (
            (this.state.comments.map || []).map(comment => {
              return <li className="comment-list-item">{comment.text}}</li>;
            })
          )}
        </ul>
      </React.Fragment>
    );
  }
}
