import React from "react";
import { NavBar, NavBarItem } from "./NavBar";
import { render } from "__utils__/renderWithRouter";

it("should blink", () => {
  jest.useFakeTimers();
  const { getByText } = render(
    <NavBar>
      <NavBarItem text="Foo" to="/" isBlinking />
    </NavBar>
  );
  const navBar = getByText("Foo").parentElement;
  jest.advanceTimersByTime(1000);
  expect(navBar).toHaveClass("itemDark");
  jest.advanceTimersByTime(1000);
  expect(navBar).not.toHaveClass("itemDark");
  jest.advanceTimersByTime(1000);
  expect(navBar).toHaveClass("itemDark");
});

it("should become light after blinking stop", () => {
  jest.useFakeTimers();
  const { getByText, rerender } = render(
    <NavBar>
      <NavBarItem text="Foo" to="/" isBlinking />
    </NavBar>
  );
  const navBar = getByText("Foo").parentElement;
  jest.advanceTimersByTime(1000);
  expect(navBar).toHaveClass("itemDark");
  rerender(
    <NavBar>
      <NavBarItem text="Foo" to="/" isBlinking={false} />
    </NavBar>
  );
  expect(navBar).not.toHaveClass("itemDark");
});
