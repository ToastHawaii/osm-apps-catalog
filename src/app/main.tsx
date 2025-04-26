import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router";
import "./ui/utilities/i18n";
import { App } from "./ui/App";

export function render() {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );

  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
}
