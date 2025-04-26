import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router";
import "./app/ui/utilities/i18n";
import { App } from "./app/ui/App";

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
