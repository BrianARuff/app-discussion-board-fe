import React from "react";
import axios from "axios";
import { FormControl, Button } from "@material-ui/core";
import "../styles/createComments.css";

export default class CreateComment extends React.Component {
  state = {
    text: ""
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmittingComment = () => {
    axios
      .post(`https://discussion-site.herokuapp.com/comments`, {
        author: this.props.user.name,
        text: this.state.text,
        author_id: Number(this.props.user.id), // convert to number for db
        article_id: Number(this.props.article.id) // convert to number for db
      })
      .then(res => {
        document.location.reload();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="comment-form">
        <h4
          id="post-title"
          aria-label="post comment"
          style={{ textAlign: "left" }}
        >
          Post a Comment
        </h4>
        <FormControl fullWidth required>
          <textarea
            aria-labelledby="post-title"
            name="text"
            type="text"
            onChange={this.handleInputChange}
            rows="5"
            style={{
              borderStyle: "inset",
              borderRadius: "4px",
              border: "1px solid black",
              padding: "50px",
              fontSize: "16px",
              margin: "0 0 20px 0"
            }}
            className="fw-light"
          ></textarea>
        </FormControl>
        <Button
          onClick={this.handleSubmittingComment}
          variant="contained"
          fullWidth={true}
          color="secondary"
          style={{
            display: "flex",
            justifyContent: "center",
            alingItems: "center"
          }}
        >
          Post Comment
        </Button>
      </div>
    );
  }
}
