import { useTranslation } from "react-i18next";
import { Moon, Sun } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import React from "react";
import { useTheme } from "@components/ThemeProvider";
import { Button } from "@components/ui/button";

export function ThemeModeToggle() {
  const { t } = useTranslation();
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all [html.theme-mode-dark_&]:scale-0 [html.theme-mode-dark_&]:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all [html.theme-mode-dark_&]:scale-100 [html.theme-mode-dark_&]:rotate-0" />
          <span className="sr-only">{t("toggleTheme.sreenReader")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="hidden [html.theme-mode-dark_&]:block"
        >
          {t("toggleTheme.light")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="[html.theme-mode-dark_&]:hidden"
        >
          {t("toggleTheme.dark")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          {t("toggleTheme.system")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
