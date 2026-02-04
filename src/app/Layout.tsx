import { Header } from "@components/layout/header";
import React from "react";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div id="content">
      <Header />
      <Outlet />
    </div>
  );
}
