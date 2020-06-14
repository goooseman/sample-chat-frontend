import React, { PureComponent } from "react";
import classes from "./SettingsPage.css";
import cn from "clsx";
import Button from "src/components/ui-kit/Button";
import Input from "src/components/ui-kit/Input";
import { T } from "react-targem";
import { Locale, locales } from "src/config/locales";

interface SettingsPageProps {
  username?: string;
  locale: Locale;
  onResetDefaultClick: () => void;
  onUsernameChange: (username: string) => void;
  onLocaleChange: (locale: Locale) => void;
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
