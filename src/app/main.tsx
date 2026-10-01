import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import "./ui/lib/i18n";
import { Router } from "@app/Router";
import Layout from "@app/Layout";
import { TooltipProvider } from "@components/ui/tooltip";

export function render() {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
  );

  root.render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <TooltipProvider>
                <Layout />
              </TooltipProvider>
            }
          >
            <Route path="/" element={<Router />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>,
  );
}
