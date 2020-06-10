// https://github.com/storybookjs/storybook/tree/master/addons/contexts

import { ThemeContextProvider } from "../src/contexts/ThemeContext";
import { themes } from "../src/config/themes";
import { locales } from "../src/config/locales";
import { TargemProvider } from "react-targem";
import translationsJson from "src/i18n/translations.json";

const localeParams = locales.map((l, i) => {
  return {
    name: l,
    props: { locale: l, translations: translationsJson },
    default: i === 0,
  };
});

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
  {
    icon: "globe",
    title: "Locale",
    components: [TargemProvider],
    params: localeParams,
    options: {
      deep: false,
    },
  },
];
