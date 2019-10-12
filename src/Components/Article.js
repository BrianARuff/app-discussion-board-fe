import React from "react";

// material UI card components
import { Avatar } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

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
                Likes: {this.props.article.likes}
              </span>
              <span
                className="fw-light pd-x-1"
                style={{
                  fontSize: "12px",
                  marginLeft: "0px"
                }}
              >
                Dislikes: {this.props.article.dislikes}
              </span>
            </div>
          </CardActions>
        </Card>
      </div>
    );
  }
}
