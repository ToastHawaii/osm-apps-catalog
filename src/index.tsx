import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router";
import "./ui/utilities/i18n";
import { App } from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
