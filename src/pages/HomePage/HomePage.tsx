import React, { PureComponent } from "react";
import Button from "src/components/ui-kit/Button";
import { RouteComponentProps } from "react-router-dom";

interface HomePageProps extends RouteComponentProps {}

class HomePage extends PureComponent<HomePageProps> {
  render(): React.ReactNode {
    return (
      <main>
        <Button>Hello world</Button>
      </main>
    );
  }
}

export default HomePage;
