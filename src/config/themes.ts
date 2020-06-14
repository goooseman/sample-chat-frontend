export const themes = ["default", "dark"] as const;

export const defaultThemeName: ThemeName = "default";

export type ThemeName = typeof themes[number];
