import React, { PureComponent } from "react";
import classes from "./SettingsPage.css";
import cn from "clsx";
import Button from "src/components/ui-kit/Button";
import Input from "src/components/ui-kit/Input";
import { T } from "react-targem";

interface SettingsPageProps {
  onResetDefaultClick: () => void;
  onUsernameChange: (username: string) => void;
}

class SettingsPage extends PureComponent<SettingsPageProps> {
  render(): React.ReactNode {
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
          />
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
}

export default SettingsPage;
