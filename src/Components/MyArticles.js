import React from "react";
// import axios from "axios";

export default class MyArticles extends React.Component 
{
  
  state = {
    articles: []
  }

  // componentWillMount() {
  //   axios.get(`https://suicide-watch-backend.herokuapp.com/users/articles/${this.props.user.id}`)
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }

  render() {
    return (
      <h2>ID: {this.props.user.id}...</h2>
    )
  }
}