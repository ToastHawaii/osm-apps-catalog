import { Header } from "@components/layout/header";
import React from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router";

export default function Layout() {
  const { i18n } = useTranslation();

  document.documentElement.lang = i18n.resolvedLanguage || "en";

  return (
    <div id="content">
      <Header />
      <Outlet />
    </div>
  );
}
