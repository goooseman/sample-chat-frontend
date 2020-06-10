export const routes = {
  home: "/",
} as const;

export type Route = typeof routes[keyof typeof routes];
