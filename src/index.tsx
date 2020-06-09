import React from "react";
import { render } from "react-dom";
import Button from "src/components/ui-kit/Button";
import AppWrapper from "src/wrappers/AppWrapper";

render(
  <AppWrapper>
    <Button>Hello world</Button>
  </AppWrapper>,
  document.getElementById("root") as HTMLElement
);
