import React from "react";
import RadioGroup from "./RadioGroup";
import { action } from "@storybook/addon-actions";

export default { title: "components/ui-kit/RadioGroup", component: RadioGroup };

const handleChange = action("onClick");

const defaultProps = {
  labelledWith: "Foo?",
  id: "story",
  options: [
    {
      value: "foo",
      text: "Foo!",
    },
    {
      value: "bar",
      text: "Bar!",
    },
  ],
  onChange: handleChange,
  value: "foo",
};

export const withTwoOptions = (): React.ReactNode => (
  <RadioGroup {...defaultProps} />
);

const fourOptions = [
  {
    value: "foo",
    text: "Foo!",
  },
  {
    value: "bar",
    text: "Bar!",
  },
  {
    value: "fuu",
    text: "Fuu!",
  },
  {
    value: "ber",
    text: "Ber!",
  },
];

export const withFourOptions = (): React.ReactNode => (
  <RadioGroup {...defaultProps} options={fourOptions} />
);
