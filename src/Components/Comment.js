import React from "react";
import "../styles/comment.css";
import { Paper } from "@material-ui/core";
import ReactMarkdown from "react-markdown";

export default class Comment extends React.Component {
  render() {
    return (
      <div style={{ padding: "20px" }} className="comment-container">
        <Paper
          elevation={10}
          style={{ padding: "20px", border: "1px solid black" }}
        >
          <h4 className="posted-by fw-bold">
            Posted By: {this.props.comment.author}
          </h4>
          <ReactMarkdown
            className="fw-light"
            source={this.props.comment.text.replace(/<br ?\/?>/g, "\n")}
          />
        </Paper>
        {/* <div className="post-info">
          {" "}
          <span className="likes">
            {this.props.comment.likes}
          </span>{" "}
          ||
          <span style={{ margin: "0 1.6rem" }} className="dislikes">
            {this.props.comment.dislikes}
          </span>
        </div> */}
      </div>
    );
  }
}
