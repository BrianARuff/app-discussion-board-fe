import React from "react";
import ReactDOM, { StaticRouter } from "react-router-dom";
import App from "../src/App.js";
import express from "express";

const context = {};

const markup = ReactDOM.renderToString(
  <StaticRouter location={req.url} context={context}>
    <App />
  </StaticRouter>
);
