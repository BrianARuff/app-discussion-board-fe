import React from "react";
import "../styles/articlePage.css";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import Avatar from "@material-ui/core/Avatar";
import defaultAvatarJPEG from "../Images/defaultAvatar.png";
import Comments from "../Components/Comments";
import CreateComment from "../Components/CreateComment";
import ReactMarkdown from "react-markdown";

export default class ArticlePage extends React.Component {
  state = {
    article: {},
    articlePoster: {},
    user: {},
    status: "Loading",
    count: 0
  };

  // validate account...
  async componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ status: "Loading", count: 1 });
    const payload = (await document.cookie.split("=")[1]) || "";
    if (payload.length > 0) {
      const bearerToken = payload.split(".")[1];
      const payloadData = JSON.parse(atob(bearerToken));
      this.setState({ user: payloadData });
      const articleNumber = window.location.href.split("/")[4];
      axios
        .get(
          `https://discussion-site.herokuapp.com/articles/${articleNumber}`
        )
        .then(res => {
          this.setState({ article: res.data.article });
          axios
            .get(
              `https://discussion-site.herokuapp.com/users/${res.data.article.user_id}`
            )
            .then(articlePoster => {
              this.setState({
                articlePoster: articlePoster.data,
                status: "Completed"
              });
            });
        })
        .catch(err => {
          this.setState({ article: {}, status: "Completed" });
          console.error(err);
        });
    } else {
      this.setState({ user: {}, status: "Completed" });
    }
  }

  render() {
    return (
      <div className="article-page-container">
        {this.state.status === "Loading" ? (
          <ClipLoader />
        ) : (
          <React.Fragment>
            <div className="title-image">
              {" "}
              <h4 className="fw-bold">{this.state.article.title} </h4>
              <Avatar
                alt={
                  this.state.article.name ? this.state.article.name : "No Name"
                }
                src={
                  Object(this.state.articlePoster).hasOwnProperty("image")
                    ? this.state.articlePoster.image
                    : defaultAvatarJPEG
                }
              />
            </div>
            <div className="fw-light">
              <ReactMarkdown
                source={this.state.article.text.replace(/<br ?\/?>/g, "\n")}
              />
            </div>
            <div className="postInfoContainer">
              <span className="author">
                Posted By: {this.state.article.author}
              </span>
              <span className="likes">Likes: {this.state.article.likes}</span>
              <span className="dislikes">
                Dislikes: {this.state.article.dislikes}
              </span>
            </div>
            <div style={{ width: "100%" }} className="comments-container">
              <CreateComment
                user={this.state.user}
                article={this.state.article}
                articlePost={this.state.articlePoster}
              />
              <h4>Comments</h4>
              <Comments article={this.state.article} />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
