import React, { PureComponent } from "react";
import classes from "./NotFound.css";
import cn from "clsx";
import { RouteComponentProps, Link } from "react-router-dom";
import Typography from "src/components/ui-kit/Typography";
import { routes } from "src/config/routes";
import { T } from "react-targem";

// Images

import Image404Dog from "./404-dog.jpg";

interface NotFoundProps extends RouteComponentProps {}

class NotFound extends PureComponent<NotFoundProps> {
  render(): React.ReactNode {
    return (
      <main className={cn(classes.container)}>
        <div className={cn(classes.innerContainer)}>
          {/* "error page" by eoshea is licensed under CC BY-NC-SA 2.0 */}
          {/* https://ccsearch.creativecommons.org/photos/3803cd7d-a9a2-413b-a01c-86182d316197 */}
          <img src={Image404Dog} alt="Not found image" />
          <div className={cn(classes.textContainer)}>
            <Typography variant="h1">
              <T message="Ooops... Page not found..." />
            </Typography>
            <Typography>
              <T message="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable." />
            </Typography>
            <Typography>
              <Link to={routes.home}>
                <T message="Go home" />
              </Link>
            </Typography>
          </div>
        </div>
      </main>
    );
  }
}

export default NotFound;
