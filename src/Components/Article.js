import React from "react";

// material UI card components
import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  Button
} from "@material-ui/core";

// unclassified
import ReactMarkdown from "react-markdown";
import defaultAvatarJPEG from "../Images/defaultAvatar.png";

// AJAX
import axios from "axios";

// style sheet
import "../styles/article.css";

export default class Article extends React.Component {
  state = {
    width: window.innerWidth,
    image: "",
    showModal: false
  };

  componentDidMount() {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    this.props.article.user_id = Number(this.props.article.user_id);

    window.addEventListener(
      "resize",
      this.setState({ width: window.innerWidth })
    );

    axios
      .get(
        `https://suicide-watch-backend.herokuapp.com/users/${this.props.article.user_id}`
      )
      .then(res => {
        this.setState({ image: res.data.image, id: res.data.id });
      })
      .catch(err => {
        this.setState({ status: "Error Loading Image" });
        console.error(err);
      });
  }

  componentWillUnmount() {
    window.removeEventListener(
      "resize",
      this.setState({ width: window.innerWidth })
    );
  }

  goToArticlePage = e => {
    this.props.history.push(`/article/${this.props.article.id}`);
  };

  handleDislike = e => {
    axios
      .patch(
        `https://suicide-watch-backend.herokuapp.com/articles/${this.props.article.id}/dislike`
      )
      .then(res => {
        let position = document.querySelector("#root").getBoundingClientRect();
        let { right, top } = position;
        this.setState({ top, right }, () => {
          window.location.reload();
          window.scroll(right, -1 * top);
        });
      })
      .catch(err => console.error(err));
  };

  handleLike = e => {
    axios
      .patch(
        `https://suicide-watch-backend.herokuapp.com/articles/${this.props.article.id}/like`
      )
      .then(res => {
        let position = document.querySelector("#root").getBoundingClientRect();
        let { right, top } = position;
        this.setState({ top, right }, () => {
          window.location.reload();
          window.scrollTo(right, -1 * top);
        });
      })
      .catch(err => console.error(err));
  };

  componentDidUpdate() {
    window.scroll(this.state.right, -1 * this.state.top);
  }

  render() {
    return (
      <div className="article-list-container">
        <Card>
          <CardActionArea onClick={this.goToArticlePage}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
              }}
            >
              <Avatar
                alt={
                  this.props.article.name ? this.props.article.name : "No Name"
                }
                src={this.state.image ? this.state.image : defaultAvatarJPEG}
                className="article-image"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {this.props.article.hasOwnProperty("title")
                    ? this.props.article.title
                    : "No Name"}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="div"
                >
                  <ReactMarkdown
                    source={this.props.article.text.replace(/<br ?\/?>/g, "\n")}
                  />
                </Typography>
              </CardContent>
            </div>
          </CardActionArea>
          <CardActions>
            <div className="flex-row">
              <span
                className="fw-light"
                style={{
                  fontSize: "12px"
                }}
              >
                Posted By: {this.props.article.author}
              </span>
              <span
                className="fw-light pd-x-1"
                style={{
                  fontSize: "12px"
                }}
              >
                <Button
                  fullWidth={true}
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={this.handleLike}
                >
                  Likes: {this.props.article.likes}
                </Button>
              </span>
              <span
                className="fw-light pd-x-1"
                style={{
                  fontSize: "12px",
                  marginLeft: "0px"
                }}
              >
                <Button
                  fullWidth={true}
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={this.handleDislike}
                >
                  Dislikes: {this.props.article.dislikes}
                </Button>
              </span>
            </div>
          </CardActions>
        </Card>
      </div>
    );
  }
}
