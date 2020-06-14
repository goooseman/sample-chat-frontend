import React from "react";
import TimeDisplay, { TimeDisplayProps } from "./TimeDisplay";
import { withSettings, WithSettings } from "src/contexts/SettingsContext";
import { WithLocaleStateful, withLocale } from "react-targem";

interface ContainerProps
  extends WithSettings,
    WithLocaleStateful,
    TimeDisplayProps {}

export default withLocale(
  withSettings((props: ContainerProps) => (
    <TimeDisplay
      locale={props.locale}
      is12hours={props.is12hours}
      date={props.date}
    />
  ))
);
