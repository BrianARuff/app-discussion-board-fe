import React from "react";
import axios from "axios";
import {
  FormHelperText,
  FormControl,
  Button,
  InputLabel,
  Input
} from "@material-ui/core";
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
      .post(`https://suicide-watch-backend.herokuapp.com/comments`, {
        author: this.props.user.name,
        text: this.state.text,
        author_id: Number(this.props.user.id),
        article_id: Number(this.props.article.id)
      })
      .then(res => {
        this.setState({ text: "" });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="comment-form">
        <h4 style={{ textAlign: "left" }}>Post a Comment</h4>
        <FormControl fullWidth required>
          <InputLabel>Comment Text</InputLabel>
          <Input name="text" type="text" onChange={this.handleInputChange} />
          <FormHelperText>Fill out either your username</FormHelperText>
        </FormControl>
        <br />
        <br />
        <Button
          onClick={this.handleSubmittingComment}
          variant="contained"
          fullWidth={true}
          color="secondary"
        >
          Post Comment
        </Button>
      </div>
    );
  }
}
