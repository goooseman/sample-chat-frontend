// https://github.com/storybookjs/storybook/tree/master/addons/contexts

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
    icon: "wrench",
    title: "Settings",
    components: [SettingsContextProvider],
    params: [
      {
        name: "Default theme / 12 hours / CTRL + ENTER disabled",
        props: { is12hours: true, theme: "default", isCtrlEnterToSend: false },
      },
      {
        name: "Dark theme / 12 hours / CTRL + ENTER disabled",
        props: { is12hours: true, theme: "dark", isCtrlEnterToSend: false },
      },
      {
        name: "Default theme / 24 hours / CTRL + ENTER disabled",
        props: { is12hours: false, theme: "default", isCtrlEnterToSend: false },
      },
      {
        name: "Default theme / 12 hours / CTRL + ENTER enabled",
        props: { is12hours: true, theme: "default", isCtrlEnterToSend: true },
      },
    ],
  },
  {
    icon: "globe",
    title: "Locale",
    components: [TargemProvider],
    params: localeParams,
  },
];
