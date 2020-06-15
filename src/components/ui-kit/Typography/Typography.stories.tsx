import React from "react";
import Typography from "./Typography";
import { Link } from "react-router-dom";

export default { title: "components/ui-kit/Typography", component: Typography };

export const withP = (): React.ReactNode => (
  <Typography>Hello, world!</Typography>
);

export const withPWithoutGutterBottom = (): React.ReactNode => (
  <Typography gutterBottom={false}>Hello, world!</Typography>
);

export const withSmallSize = (): React.ReactNode => (
  <Typography size="small">Hello, world!</Typography>
);

export const withH1 = (): React.ReactNode => (
  <Typography variant="h1">Hello, world!</Typography>
);

export const withH2 = (): React.ReactNode => (
  <Typography variant="h2">Hello, world!</Typography>
);

export const withH3 = (): React.ReactNode => (
  <Typography variant="h3">Hello, world!</Typography>
);

export const withStylesPassed = (): React.ReactNode => (
  <Typography style={{ color: "green" }}>Hello, world!</Typography>
);

export const withMutedColor = (): React.ReactNode => (
  <Typography color="muted">Hello, world!</Typography>
);

export const withContrastColor = (): React.ReactNode => (
  <div style={{ backgroundColor: "red" }}>
    <Typography color="contrast">Hello, world!</Typography>
  </div>
);

export const withDangerColor = (): React.ReactNode => (
  <Typography color="danger">Hello, world!</Typography>
);

export const withLink = (): React.ReactNode => (
  <Typography>
    <Link to="/">Hello, world!</Link>
  </Typography>
);
