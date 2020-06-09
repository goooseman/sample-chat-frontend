export const themes = [
  {
    name: "default",
    class: "theme-default",
    color: "#fff",
    default: true,
  },
  {
    name: "dark",
    class: "theme-dark",
    color: "#000",
    default: false,
  },
] as const;

export const defaultThemeName: ThemeName = "default";

export type ThemeName = typeof themes[number]["name"];
