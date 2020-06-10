import React, { PureComponent } from "react";
import Button from "src/components/ui-kit/Button";
import { RouteComponentProps } from "react-router-dom";
import { T } from "react-targem";

interface HomePageProps extends RouteComponentProps {}

class HomePage extends PureComponent<HomePageProps> {
  render(): React.ReactNode {
    return (
      <main>
        <Button>
          <T message="Hello world" />
        </Button>
      </main>
    );
  }
}

export default HomePage;
