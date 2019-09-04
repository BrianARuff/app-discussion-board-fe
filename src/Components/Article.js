import React from "react";
import ReactMarkdown from "react-markdown";
import { Grid, Avatar } from "@material-ui/core";
import defaultAvatarJPEG from "../Images/defaultAvatar.png";
import axios from "axios";
import "../styles/article.css";

export default class Article extends React.Component {
  state = {
    width: window.innerWidth,
    image: ""
  }
  componentDidMount() {
    this.props.article.user_id = Number(this.props.article.user_id);

    window.addEventListener("resize", this.setState({ width: window.innerWidth }));

    axios.get(`https://suicide-watch-backend.herokuapp.com/users/${this.props.article.user_id}`)
    .then(res => {
      this.setState({ image: res.data.image, id: res.data.id });
    })
    .catch(err => {
      this.setState({ status: "Error Loading Image" });
      console.error(err);
    });
    
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setState({ width: window.innerWidth }));
  }

  render() {
    return (
      <div  
        className="article-list-container"
      >
        <Grid
          container
          style={{ position: "relative" }} justify="center"
          alignItems="center"
        >
          <Grid
            item
          >
            <span className="article-title fw-bold">              {this.props.article.hasOwnProperty("title") ? this.props.article.title : "No Name"}</span>
          </Grid>
          <Grid
            item
            style={{
              position: "relative",
              top: 0,
              left: 0,
              margin: "20px 0",
              display: this.state.width < 769 ? "none" : "flex"
            }}
          >
            <Avatar
              alt={this.props.article.name ? this.props.article.name : "No Name"}
              src={this.state.image ? this.state.image : defaultAvatarJPEG} className="article-image"
            />
          </Grid>
        </Grid>
        <ReactMarkdown
          source={this.props.article.text.replace(/<br> ?\/?>/g, "\n")}
        />
        <br />
        <div className="flex-row">
          <span
            className="fw-light"
            style={{
              fontSize: "12px"
            }}
          >Posted By: {this.props.article.author}</span>
          <span
            className="fw-light pd-x-1"
            style={{
              fontSize: "12px"
            }}>
            Likes: {this.props.article.likes}
          </span>
          <span
            className="fw-light pd-x-1"
            style={{
              fontSize: "12px",
              marginLeft: "0px"
            }}>
            Dislikes: {this.props.article.dislikes}
          </span>
        </div>
      </div>
    )
  }
}