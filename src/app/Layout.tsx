import { Header } from "@components/layout/Header";
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
