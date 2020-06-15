import React from "react";
import TimeDisplay from "./TimeDisplay";

export default { title: "components/TimeDisplay", component: TimeDisplay };

const now = new Date();

const defaultProps = {
  locale: "en-US",
  is12hours: true,
  date: now,
};

export const withEnUsAnd12h = (): React.ReactNode => (
  <TimeDisplay {...defaultProps} />
);

export const withEnUsAnd24h = (): React.ReactNode => (
  <TimeDisplay {...defaultProps} is12hours={false} />
);

const anotherDay = new Date(now.getFullYear(), 3, 29);

export const withDateAnotherDay = (): React.ReactNode => (
  <TimeDisplay {...defaultProps} date={anotherDay} />
);

export const withDateAnotherDayIn24h = (): React.ReactNode => (
  <TimeDisplay {...defaultProps} date={anotherDay} is12hours={false} />
);

export const withDateAnotherDayAndFrenchLanguage = (): React.ReactNode => (
  <TimeDisplay
    {...defaultProps}
    date={anotherDay}
    locale="fr"
    is12hours={false}
  />
);

export const withDateAnotherDayAndFrenchLanguageIn12hours = (): React.ReactNode => (
  <TimeDisplay {...defaultProps} date={anotherDay} locale="fr" is12hours />
);

const anotherYear = new Date(1976, 3, 11);

export const withDateAnotherYear = (): React.ReactNode => (
  <TimeDisplay {...defaultProps} date={anotherYear} />
);
