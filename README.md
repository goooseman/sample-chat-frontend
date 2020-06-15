# Sample React Chat

[![Netlify Status](https://api.netlify.com/api/v1/badges/3ad6d92e-0c62-4c1c-ab3f-241387186de0/deploy-status)](https://app.netlify.com/sites/sample-chat/deploys) [![Coverage Status](https://coveralls.io/repos/github/goooseman/sample-chat-frontend/badge.svg?branch=master)](https://coveralls.io/github/goooseman/sample-chat-frontend?branch=master) ![Tests status](https://github.com/goooseman/sample-chat-frontend/workflows/Tests/badge.svg) ![Linters status](https://github.com/goooseman/sample-chat-frontend/workflows/Linters/badge.svg) [![Dependencies status](https://david-dm.org/goooseman/sample-chat-frontend/status.svg)](https://david-dm.org/goooseman/sample-chat-frontend) [![Dev dependencies status](https://david-dm.org/goooseman/sample-chat-frontend/dev-status.svg)](https://david-dm.org/goooseman/sample-chat-frontend?type=dev)

[Storybook Preview](https://sample-chat.storybooks.goooseman.ru/) | [Project Preview](https://sample-chat.goooseman.ru/)

<p align="center">
  <img src="./public/android-chrome-192x192.png" alt="Logo" />
</p>

### TODO

- Link parser (videos/images/links)
- Translate
- Store messages in sqlite
- Blinking tab bar (tests)
- Error notification

### Quick start

- `npm start` to start the project in development mode
- `npm run start:local` to start the project in development mode and use `localhost:8090` as a backend url. Use it, if you have an instance of [sample-chat-backend](https://github.com/goooseman/sample-chat-backend) running on your machine.
- `docker-compose up` to start the project locally and start [sample-chat-backend](https://github.com/goooseman/sample-chat-backend) automatically. Use it to preview the project without internet access.
- `npm run storybook` to start [storybook](#storybook-) in development mode
- `npm run build:prod` to build the project in production mode to the `/dist` folder. Use `npm run serve:app` to serve this folder locally with HTTPS support.
- `npm run build:storybook` to build the storybook in production mode to the `/storybook-static` folder. Use `npm run serve:storybook` to serve this folder locally with HTTPS support.
- `npm test` to run unit and integration tests with [jest](https://jestjs.io/).
- `npm run lint:check` to check the project using all available [linters](#linters-). This command should be a part of your CI setup.

NodeJS version is specified at `.nvmrc`. NPM version is specified at the `engines` section of `package.json`. Dependencies can not be installed with npm version lower to prevent unnecessary `package-lock.json` git conflicts, but can be opted-out by deleting `.npmrc`.

### Browser compatibility

The project is compatible with IE11.

- The Typescript compiler is configured to transpile Typescript to ES5.
- [es-check](https://github.com/dollarshaveclub/es-check) is run after each production build to make sure no 3rd-party libraries contain non-es5 code.
- It includes [polyfill.io](https://polyfill.io/v3/) to polyfill JS.
- It includes [autoprefixer](https://github.com/postcss/autoprefixer), [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties) and [postcss-custom-media](https://github.com/postcss/postcss-custom-media) to provide CSS fallbacks.
- It includes [postcss-normalize](https://www.npmjs.com/package/postcss-normalize) to import the parts of [sanitize.css](https://github.com/csstools/sanitize.css) that are needed for compatible browsers.

**To change browser compatibility** just edit the `.browserlistrc` file in the root of the project.

### Developer tools

#### Typescript 🤓

[Why Typescript?](https://basarat.gitbook.io/typescript/getting-started/why-typescript) | [Typescript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) | [Advanced types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)

The project is built with Typescript using a strict config. If a 3rd-party library is added to the project, which does not contain Typescript typing, a type definition should be written in `@types/${libName}/index.d.ts`. Don't forget to open a PR in the library's GitHub or in [Definetely Typed repository](https://github.com/DefinitelyTyped/DefinitelyTyped). Let's make the JS community type-safe together!

The project is **not type-checked during development run-time**, because it should be made on the CI server.

#### Storybook 📖

> [Check it out!](https://sample-chat.storybooks.goooseman.ru/) It's really cool!

[Storybook tutorial](https://www.learnstorybook.com/) | [Component Driven Development](https://blog.hichroma.com/component-driven-development-ce1109d56c8e)

What is **Component Driven Development**?

> It’s a process that builds UIs from the “bottom-up” starting with components and ending with screens. CDD helps you scale the amount of complexity you’re faced with as you build out the UI.
> -- <cite>[learnstorybook.com](https://www.learnstorybook.com/intro-to-storybook/react/en/simple-component/)</cite>

[Storybook](https://storybook.js.org/) helps you to develop View components in isolation.

The project has storybook, which is configured:

- to show automatic documentation of the component. The prop descriptions are taken from Typescript props and the component subtitle is taken from `jsdoc` of the component (take a look at [Button component](./src/components/ui-kit/Button/Button.tsx) for an example).
- to show a component in different CSS themes.
- to show a component in different languages (especially useful to test component in `rtl` layout for such languages as Arabic or Hebrew).
- to show accessibility problems of the component.
- to show a component in different viewports.

It is recommended to publish the storybook, so the developers will be able to have live documentation on the components of the project.

#### Integration tests 🕵️‍♂️

[Guiding Principles](https://testing-library.com/docs/guiding-principles) | [How to know what to test](https://kentcdodds.com/blog/how-to-know-what-to-test) | [Five factor testing](https://madeintandem.com/blog/five-factor-testing/) | [Principles of Automated Testing](https://www.lihaoyi.com/post/PrinciplesofAutomatedTesting.html)

> The more your tests resemble the way your software is used, the more confidence they can give you.
> -- <cite>[Kent C. Dodds](https://twitter.com/kentcdodds/status/977018512689455106)</cite>

> Write tests. Not too many. Mostly integration.
> -- <cite>[Kent C. Dodds](https://kentcdodds.com/blog/write-tests/)</cite>

The project includes [**utils**/render.tsx](./__utils__/render.tsx), which is a drop-in replacement for `@testing-library/react`, but with support of:

- [jest-dom custom matchers](https://github.com/testing-library/jest-dom)
- [React.StrictMode](https://reactjs.org/docs/strict-mode.html) to prevent side-effects
- i18n provider for tests not to fail on translated strings

Additionally, the project contains `__utils__/renderWithRouter.tsx` to write tests for containers with some redirection logic.

**When to write a test**:

- React _Smart_ containers should have business logic integration tests.
- React _View_ components usually do not require tests. But there are some exceptions:
  - Regression bug which happened because of a prop has not been passed to an underlying component, e.g. Button component, which does not forward `onClick` prop to the `<button />` element. In this case a regression test can be written ([example](./src/components/ui-kit/Button/Button.spec.tsx)).
  - A component, which contains some view-related business logic, e.g. Button which prevents double click within 500ms.
- Any non-React code containing business logic.

**Do not do it**:

- Do not test implementation details. Those tests can be broken during the refactoring of the code and become `false negative`. It will require the developer to fix the test even if the specification of the system did not change.
- Do not test private methods. This is a more specific case of the previous bad practice, but it is better to be written explicitly.
- Do not use testing-only selectors (if possible) in UI tests and frontend integration tests. To avoid using them the developer should use text values of HTML elements or [ARIA attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) [instead of using `data-testid`](https://medium.com/@gregberge/yes-i-think-adding-a-aria-instead-of-a-data-test-is-much-more-valuable-for-the-user-c6e021b0be21).
- Do not try to reach 100% code coverage and do not encourage developers to do so. Code coverage does not tell if the code is working according to the specification.

#### i18n 🌍

The project uses [react-targem](https://github.com/trucknet-io/react-targem#readme) with [gettext-utils](https://github.com/goooseman/gettext-utils) to provide i18n support.

- Locales are stored as **.po files**, which are easy to be edited by translators using tools like [POEdit](https://poedit.net/).
- To make your development workflow more fluent, an open-source [Weblate](https://weblate.org/en/) system can be installed and configured to provide translators with an easy-to-use system, which is automatically synced with the git repository.
- `.po` files store information about pluralization rules for every language.
- After translation strings are added or removed, the .po files are updated automatically on commit using [lint-staged](https://github.com/okonet/lint-staged).
- Webpack is not able to import .po files directly, so [webpack-shell-plugin-next](https://www.npmjs.com/package/webpack-shell-plugin-next) is used to build `src/i18n/translation.json` file automatically on each build. In the future this can be improved by creating a webpack loader.
- `dir="ltr"` or `dir="rtl"` is added automatically to the root div automatically to support **right-to-left** languages. If you need to support one of those languages make sure to follow [RTL CSS Guidelines](https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/RTL_Guidelines).
- To add a new language support, just open `src/i18n/template.pot` in [POEdit](https://poedit.net/) and create a new locale file from it. Save it to `src/i18n` folder and update `src/config/locales.ts` file.
- [Storybook](#storybook-) is configured to display components in different languages and different directions.

#### Styles 🎨

The project uses CSS instead of those fancy CSS-in-JS solutions. There are a lot of disadvantages in CSS, such as:

- Lack of isolation. Solved by using [css-modules](https://github.com/css-modules/css-modules).
- Lack of variables. Solved by using [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties) as a fallback for browsers, which does not support [custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*).
- Lack of theming. Solved by setting different root-level custom CSS properties. That works only in supported browsers, but that is a matter of graceful degradation.
- CSS-naming-convention is not `camelCase`, so is not so comfortable to be used in JS/TS code. Solved by using [css-loader's localsConvention option](https://webpack.js.org/loaders/css-loader/#localsconvention).

#### Linters 🚨

Linters are not your enemies, they help developers to avoid mistakes and to follow common specifications. This project contains the following linters:

- [prettier](https://prettier.io) - An opinionated code formatter. It helps us to have minimum git diffs by having a common code style.
- [esLint](https://eslint.org) - JS/TS linter. It helps us to avoid common mistakes and bad design patterns in Typescript code.
- [typescript](https://www.typescriptlang.org) - not a linter, but used as a linter to check if there any type problems in the project.
- [stylelint](https://stylelint.io) - CSS linter. It helps us to avoid CSS errors and orders CSS rules according to [idiomatic-css](https://github.com/necolas/idiomatic-css#declaration-order). [Why do we need to order it?](https://dev.to/thekashey/happy-potter-and-the-order-of-css-5ec).
- [commitlint](https://commitlint.js.org) - commit message linter. It helps us to follow the [conventional commit format](https://conventionalcommits.org).

Linters are useless if they are not integrated with the development workflow. This project provides you with the **following integrations**:

- VSCode users should install the recommended extensions. Files are fixed on every save automatically. Refer to [VSCode section](#vs-code-).
- [husky](https://github.com/typicode/husky) is used to check every commit message with `commitlint`.
- [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged) are used to automatically run linters across staged files on every git commit.
- Use `npm run lint:check` to check all the codebase at once. Configure this command to be run on your CI server.
- Use `npm run lint:write` to check all the codebase and fix issues automatically (if possible). **Use it after config change.**

#### VS Code 💻

The project is configured to be used in [VS Code](https://code.visualstudio.com/).

It contains `.vscode/extensions.json` file with a list of recommended extensions. Just open the extensions tab in your editor, and choose to show recommended extensions. Install those to have incredible development experience including all the linters support and amazing CSS modules autocompletion.

It also contains helpful code snippets to scaffold new React components. Just start typing `reactComponent` in a new file to create a new component, `reactComponentStorybook` to create a new storybook and `reactComponentIndex` to create an index file.

The debugger is configured to run a specific test, by pressing `F5` when a `.spec` file is open. But a debugger gives an additional overhead, so a task to just run a specific test is added to run tests faster when debugging is not needed. Unfortunately, there is no comfortable shortcut to run a task in VS Code, but you can configure it yourself by specifying a keyboard shortcut (e.g. `F6`) for `Tasks: Rerun Last Task` command.

#### Production deps 💼

The project contains `webpack` and other build-time dependencies listed as production ones. This is not a mistake and done on a purpose.

It is common for a frontend project to list only dependencies, which are used inside a production bundle (e.g. `react`, `react-dom`, `@material-ui` or others) as production ones. But actually a frontend project is bundled before being distributed. So no dependencies are required during run-time.

On the other hand, there are "true" `development` dependencies, like `storybook`-related ones, testing-related ones, linters and etc. We do not need them on the CD server, which builds the application before it is being distributed. We need those only on developers' machines.

So the solution is pretty straightforward - to list everything, which is required to build the project as production dependencies. To have an ability to install only those ones on the CD server and save some time.

#### No babel? 🗼

This project does not use babel to transpile typescript code, because [certain constructs don’t currently compile in Babel 7](https://devblogs.microsoft.com/typescript/typescript-and-babel-7/).

But there are some **npm warnings** because it is a peer dependency of [Storybook](https://storybook.js.org/). In this project storybook's loaders are rewritten in a custom config, so babel is not needed. Peer dependency warnings are bad, no doubt. But an extra unnecessary dependency is worse.

#### No HMR? ♻️

The project does not contain HMR in dev mode (`npm start`). HMR is mostly useful for component design development, which should be done in [Storybook](https://storybook.js.org/), which supports HMR out-of-the-box. But if you miss it, feel free to open a PR!
