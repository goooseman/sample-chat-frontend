import React from "react";
import HomePage from "./HomePage";
import { withRouter } from "react-router-dom";

export default { title: "pages/HomePage", component: HomePage };

const Container = withRouter(HomePage);

export const Default = (): React.ReactNode => <Container />;
