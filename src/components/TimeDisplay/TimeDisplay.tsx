import React, { PureComponent } from "react";

export interface TimeDisplayProps {
  date: Date;
  locale: string;
  is12hours: boolean;
}

/** A component which diplays time, if the date is today or date and time if not */
class TimeDisplay extends PureComponent<TimeDisplayProps> {
  render(): React.ReactNode {
    const { locale, is12hours, date } = this.props;

    const isDateHidden = this.isToday(date);

    const options: Intl.DateTimeFormatOptions = {
      year: this.isThisYear(date) ? undefined : "numeric",
      month: isDateHidden ? undefined : "short",
      day: isDateHidden ? undefined : "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: is12hours,
    } as const;

    return new Intl.DateTimeFormat(locale, options).format(date);
  }

  private isToday = (someDate: Date) => {
    const today = new Date();
    return (
      someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
    );
  };

  private isThisYear = (someDate: Date) => {
    const today = new Date();
    return someDate.getFullYear() == today.getFullYear();
  };
}

export default TimeDisplay;
