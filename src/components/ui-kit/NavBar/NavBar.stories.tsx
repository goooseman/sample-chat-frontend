import React from "react";
import { NavBar, NavBarItem } from "./NavBar";

export default { title: "components/ui-kit/NavBar", component: NavBar };

export const withDefaultView = (): React.ReactNode => (
  <NavBar>
    <NavBarItem text="Chat" to="/" />
    <NavBarItem text="Settings" to="/settings" />
  </NavBar>
);

export const withBadge = (): React.ReactNode => (
  <NavBar>
    <NavBarItem text="Chat" to="/" badge={3} />
    <NavBarItem text="Settings" to="/settings" />
  </NavBar>
);

export const withBigNumberBadge = (): React.ReactNode => (
  <NavBar>
    <NavBarItem text="Chat" to="/" badge={3000} />
    <NavBarItem text="Settings" to="/settings" />
  </NavBar>
);
