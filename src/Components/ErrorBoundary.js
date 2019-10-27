import React, { lazy, Suspense } from "react";
import { ClipLoader } from "react-spinners";

const Portal = lazy(() => import("./Portal"));

export default class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    info: ""
  };
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(err, info) {
    console.error(err, info);
    this.setState({ info });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            background: "rgba(0,0,0,0.3)",
            zIndex: "1000"
          }}
        >
          <Suspense fallback={ClipLoader}>
            <Portal id="error">
              <h4>Error Found</h4>
              <p>{this.state.info}</p>
            </Portal>
          </Suspense>
        </div>
      );
    }
    return this.props.children;
  }
}
