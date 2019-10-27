import React from "react";
import ErrorBoundary from "../Components/ErrorBoundary";

const PageNotFound = props => {
  return (
    <React.Fragment>
      <h1>Page not found :(</h1>
      <p>{JSON.stringify(props, null, 4)}</p>
    </React.Fragment>
  );
};

export default function PageNotFoundWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <PageNotFound {...props} />
    </ErrorBoundary>
  );
}
