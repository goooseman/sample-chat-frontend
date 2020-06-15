import React, { PureComponent } from "react";
import classes from "./SettingsPage.css";
import cn from "clsx";
import Button from "src/components/ui-kit/Button";
import Input from "src/components/ui-kit/Input";
import { T } from "react-targem";
import { Locale, locales } from "src/config/locales";
import RadioGroup from "src/components/ui-kit/RadioGroup";
import { ThemeName } from "src/config/themes";
import Typography from "src/components/ui-kit/Typography";

interface SettingsPageProps {
  username?: string;
  locale: Locale;
  theme: ThemeName;
  is12hours: boolean;
  isCtrlEnterToSend: boolean;
  onResetDefaultClick: () => void;
  onUsernameChange: (username: string) => void;
  onLocaleChange: (locale: Locale) => void;
  onThemeChange: (theme: ThemeName) => void;
  onIs12hoursChange: (is12hours: boolean) => void;
  onIsCtrlEnterToSend: (isCtrlEnterToSend: boolean) => void;
}

class SettingsPage extends PureComponent<SettingsPageProps> {
  render(): React.ReactNode {
    const { username, locale } = this.props;

    return (
      <main className={cn(classes.container)}>
        <div className={cn(classes.fields)}>
          <Input
            className={cn(classes.input)}
            labelledWith={<T message="Username" />}
            id="username"
            type="input"
            inputType="text"
            onChange={this.handleUsernameChange}
            value={username}
          />
          <RadioGroup
            className={cn(classes.input)}
            id="theme"
            labelledWith={<T message="Theme" />}
            onChange={this.props.onThemeChange}
            value={this.props.theme}
            options={[
              {
                text: <T message="Light" />,
                value: "default",
              },
              {
                text: <T message="Dark" />,
                value: "dark",
              },
            ]}
          />
          <RadioGroup
            className={cn(classes.input)}
            id="12hours"
            labelledWith={<T message="Clock display" />}
            onChange={this.props.onIs12hoursChange}
            value={this.props.is12hours}
            options={[
              {
                text: <T message="12 hours" />,
                value: true,
              },
              {
                text: <T message="24 hours" />,
                value: false,
              },
            ]}
          />
          <Typography color="muted">
            <T message="Just for educational purposes. In a real-world application time format should be taken from the browser's locale." />
          </Typography>
          <RadioGroup
            className={cn(classes.input)}
            id="isCtrlEnterToSend"
            labelledWith={<T message="Send messages on CTRL + ENTER" />}
            onChange={this.props.onIsCtrlEnterToSend}
            value={this.props.isCtrlEnterToSend}
            options={[
              {
                text: <T message="On" />,
                value: true,
              },
              {
                text: <T message="Off" />,
                value: false,
              },
            ]}
          />
          <Input
            className={cn(classes.input)}
            labelledWith={<T message="Language" />}
            id="language"
            type="select"
            onChange={this.handleLocaleChange}
            value={locale}
          >
            {locales.map((l) => (
              <option key={l.key} value={l.key}>
                {l.localName}
                {l.internationalName !== l.localName
                  ? ` / ${l.internationalName}`
                  : null}
              </option>
            ))}
          </Input>
        </div>
        <Button size="lg" onClick={this.props.onResetDefaultClick}>
          <T message="Reset to defaults" />
        </Button>
      </main>
    );
  }

  private handleUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.props.onUsernameChange(event.target.value);
  };

  private handleLocaleChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.props.onLocaleChange(event.target.value as Locale);
  };
}

export default SettingsPage;
