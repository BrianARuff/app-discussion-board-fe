import React from "react";
import "../styles/createContent.css";
import axios from "axios";
import { FormHelperText, FormControl, Button, TextareaAutosize } from "@material-ui/core";

export default class CreateContent extends React.Component {
  state = {
    status: "Loading",
    user: {},
    isValid: false,
    image: "",
    title: "",
    text: "",
    submitButtonText: "Submit Article"
  }

  // validate account...
  async componentDidMount() {
    this.setState({ status: "Loading" });
    const payload = await document.cookie.split("=")[1] || "";
    if (payload.length > 0) {
      const bearerToken = payload.split(".")[1];
      const payloadData = JSON.parse(atob(bearerToken));
      this.setState({ status: "Loaded", isValid: true, user: payloadData });
    } else {
      this.setState({ status: "", isValid: false, user: {} });
    }

    axios.get(`https://suicide-watch-backend.herokuapp.com/users/${this.state.user.id}`)
      .then(res => {
        this.setState({ image: res.data.image, id: res.data.id })
      })
      .catch(err => {
        this.setState({ status: "Error Loading Image" });
        console.error(err);
      });
  }

  handleInputChange = (e) => {
    //credit https://jsfiddle.net/2wAzx/13/
    const el = document.getElementById("textarea");
    el.onkeydown = function(e) {
        if (e.keyCode === 9) { // tab was pressed

            // get caret position/selection
            var val = this.value,
                start = this.selectionStart,
                end = this.selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
            this.value = val.substring(0, start) + '\t' + val.substring(end);

            // put caret at right position again
            this.selectionStart = this.selectionEnd = start + 1;

            console.log(this.value, this.selectionStart, this.selectionEnd);

            // prevent the focus lose
            return false;
        }
    }

    if (e.which === 9 || e.keyCode === 9) {
      e.preventDefault();
      this.setState({text: this.state.text + "    "});
    }

    this.setState({
      [e.target.name]: e.target.value.replace(/(?:\r\n|\r|\n)/g, '<br />')
    });
  }

  postContent = () => {
    const { title, text } = this.state;
    const { id, name } = this.state.user;

    if (title.length < 10 || text.length < 50) {
      this.setState({submitButtonText: "Title or Text count is too short."});
    }

    console.log(title, text, name, id);
    axios.post(`https://suicide-watch-backend.herokuapp.com/articles/`, {
      title,
      text,
      author: name,
      user_id: id
    })
      .then(res => {
        console.log(res.data);
        this.props.history.push("/");
        window.location.reload();
      })
      .catch(err => {
        console.error(err);
      })
  }

  render() {
    return (
      <div className="create-content-flexbox">
        <h1 className="hide">Create Content Page</h1>
        <form className="create-content-form">
          <h2 className="fw-bold">Create Content</h2>
          <FormControl
            fullWidth>
            <FormHelperText
              style={
                { marginBottom: "5px" }}
            >
              Your Article's title
            </FormHelperText>
            <TextareaAutosize
              aria-label="minimum height"
              rows={1}
              placeholder="Type Title Here"
              className="text-area"
              style={{
                padding: "20px"
              }}
              name="title"
              onChange={this.handleInputChange}
            />
            <FormHelperText style={{
              color: this.state.title.length < 10 ? 'red' : 'green'
            }}>
              Title must be at least 10 characters long.
              Current Length: {this.state.title.length}
            </FormHelperText>
          </FormControl>

          <br /> <br />
          <FormControl
            fullWidth>
            <FormHelperText
              style={
                { marginBottom: "5px" }}
            >
              Your Article's content
            </FormHelperText>
            <TextareaAutosize
              id="textarea"
              aria-label="minimum height"
              rows={30}
              placeholder="Type Content Here"
              className="text-area"
              style={{
                padding: "20px"
              }}
              name="text"
              onKeyDown={this.handleInputChange}
            />
            <FormHelperText
              style={{
                color: this.state.text.length < 50 ? 'red' : 'green'                
              }}
            >
              Content must be at least 50 characters long.
              Current Length: {this.state.text.length}
            </FormHelperText>
          </FormControl>

          <br /> <br />
          <FormControl fullWidth>
            <Button
              onClick={this.postContent}
              fullWidth
              variant="contained"
              color="secondary">
              {
                this.state.submitButtonText
              }
            </Button>
          </FormControl>
        </form>
      </div>
    )
  }
}