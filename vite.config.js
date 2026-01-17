/* eslint-disable no-undef */
import path from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    build: {
      outDir: "./docs",
    },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@app": path.resolve(__dirname, "./src/app"),
        "@features": path.resolve(__dirname, "./src/features"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@shared": path.resolve(__dirname, "./shared"),
        "@actions": path.resolve(__dirname, "./github-actions"),
        "@lib": path.resolve(__dirname, "./src/lib"),
      },
    },
  };
});
