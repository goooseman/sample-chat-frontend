import React, { PureComponent } from "react";
import Button from "src/components/ui-kit/Button";
import { RouteComponentProps } from "react-router-dom";

interface HomePageProps extends RouteComponentProps {}

class HomePage extends PureComponent<HomePageProps> {
  render(): React.ReactNode {
    return <Button>Hello world</Button>;
  }
}

export default HomePage;
