import React from "react";
import { render } from "react-dom";
import AppWrapper from "src/wrappers/AppWrapper";
import Pages from "./pages";

render(
  <AppWrapper>
    <Pages />
  </AppWrapper>,
  document.getElementById("root") as HTMLElement
);
