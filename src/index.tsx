import React from "react";
import { render } from "react-dom";
import Button from "src/components/ui-kit/Button";
import StorybookSharedWrapper from "src/wrappers/StorybookSharedWrapper";

render(
  <StorybookSharedWrapper>
    <Button>Hello world</Button>
  </StorybookSharedWrapper>,
  document.body
);
