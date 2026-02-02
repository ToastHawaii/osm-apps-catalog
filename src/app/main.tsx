import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import "./ui/utilities/i18n";
import { Router } from "@app/Router";
import Layout from "@app/Layout";

export function render() {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
  );

  root.render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Router />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>,
  );
}
