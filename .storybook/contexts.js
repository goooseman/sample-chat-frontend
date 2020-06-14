// https://github.com/storybookjs/storybook/tree/master/addons/contexts

import { ThemeContextProvider } from "../src/contexts/ThemeContext";
import { SettingsContextProvider } from "../src/contexts/SettingsContext";
import { themes } from "../src/config/themes";
import { locales } from "../src/config/locales";
import { TargemProvider } from "react-targem";
import translationsJson from "src/i18n/translations.json";

const localeParams = locales.map((l, i) => {
  return {
    name: l.internationalName,
    props: { locale: l.key, translations: translationsJson },
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
  {
    icon: "wrench",
    title: "Settings",
    components: [SettingsContextProvider],
    params: [
      {
        name: "12 hours",
        props: { is12hours: true },
      },
      {
        name: "24 hours",
        props: { is12hours: false },
      },
    ],
    options: {
      deep: false,
    },
  },
];
