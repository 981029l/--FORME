"use client";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "@phosphor-icons/react";
import { site } from "@/config/site";
type Theme = "system" | "light" | "dark";
const themes: Theme[] = ["system", "light", "dark"];
const labels = { system: "跟随系统", light: "浅色模式", dark: "深色模式" };
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  useEffect(() => {
    try { const stored = localStorage.getItem(site.storage.theme) as Theme; if (themes.includes(stored)) { setTheme(stored); document.documentElement.dataset.theme = stored; } } catch {}
  }, []);
  function changeTheme() {
    const next = themes[(themes.indexOf(theme) + 1) % themes.length];
    setTheme(next);
    if (next === "system") delete document.documentElement.dataset.theme; else document.documentElement.dataset.theme = next;
    try { localStorage.setItem(site.storage.theme, next); } catch {}
  }
  const Icon = theme === "system" ? Monitor : theme === "light" ? Sun : Moon;
  return <button className="icon-button theme-toggle" onClick={changeTheme} aria-label={`当前${labels[theme]}，切换主题`} title={`${labels[theme]}，点击切换`}><Icon size={20} weight="regular" /></button>;
}
