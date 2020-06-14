export const routes = {
  home: "/",
  settings: "/settings",
} as const;

export type Route = typeof routes[keyof typeof routes];
