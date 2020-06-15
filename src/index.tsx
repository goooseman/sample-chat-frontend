import React from "react";
import { render } from "react-dom";
import AppWrapper from "src/wrappers/AppWrapper";
import Pages from "./pages";
import BodyWrapper from "src/wrappers/BodyWrapper/BodyWrapper";

render(
  <AppWrapper>
    <BodyWrapper>
      <Pages />
    </BodyWrapper>
  </AppWrapper>,
  document.getElementById("root") as HTMLElement
);
