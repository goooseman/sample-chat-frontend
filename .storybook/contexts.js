// https://github.com/storybookjs/storybook/tree/master/addons/contexts
import { ThemeContextProvider } from "../src/contexts/ThemeContext";
import { themes } from "../src/config/themes";

export const contexts = [
  {
    icon: "paintbrush", // https://storybooks-official.netlify.app/?path=/story/basics-icon--labels
    title: "Themes",
    components: [ThemeContextProvider],
    params: themes,
    options: {
      deep: false, // pass the `props` deeply into all wrapping components
    },
  },
];
