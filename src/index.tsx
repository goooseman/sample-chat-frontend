import React from "react";
import { render } from "react-dom";
import Button from "src/components/ui-kit/Button";
import "src/styles/global.css";

render(
  <div className="theme-default">
    <Button>Hello world</Button>
  </div>,
  document.body
);
