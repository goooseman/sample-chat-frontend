export const themes = [
  {
    name: "default",
    props: { activeTheme: "default" },
    default: true,
  },
  {
    name: "dark",
    props: { activeTheme: "dark" },
  },
];

export const defaultThemeName: ThemeName = "default";

export type ThemeName = typeof themes[number]["name"];
