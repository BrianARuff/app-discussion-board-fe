import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Portal = props => {
  const [node, setNode] = useState(document.createElement("div"));

  // mounting
  useEffect(() => {
    setNode(document.getElementById(`${props.id}`));
  }, [props]);

  // unmount
  useEffect(
    () =>
      document
        .getElementById("modal")
        .childNodes.forEach(node => node.removeChild),
    []
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
