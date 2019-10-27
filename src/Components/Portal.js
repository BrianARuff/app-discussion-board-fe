import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Portal = props => {
  const [node, setNode] = useState(document.createElement("div"));

  // mounting
  useEffect(() => {
    setNode(document.getElementById("error"));
  }, []);

  // unmount
  useEffect(
    () =>
      document
        .getElementById("error")
        .childNodes.forEach(node => node.removeChild),
    [props]
  );

  return ReactDOM.createPortal(
    <React.Fragment>{props.children}</React.Fragment>,
    node
  );
};

export default Portal;

// <======= Class equivalent :) ======>

// class Portal extends React.Component {
//   state = {
//     node: document.createElement("div")
//   };
//   componentDidMount() {
//     this.setState({ node: document.getElementById(`${this.props.id}`) });
//   }
//   render() {
//     return ReactDOM.createPortal(
//       <React.Fragment>{this.props.children}</React.Fragment>,
//       this.state.node
//     );
//   }
// }
