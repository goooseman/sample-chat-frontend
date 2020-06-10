import React from "react";
import NotFound from "./NotFound";
import { withRouter } from "react-router-dom";

export default { title: "pages/NotFound", component: NotFound };

const Container = withRouter(NotFound);

export const Default = (): React.ReactNode => <Container />;
