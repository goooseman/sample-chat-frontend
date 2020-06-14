// Originally taken from https://github.com/trucknet-io/react-targem/blob/develop/src/utils/locale.ts

import { Locale } from "src/config/locales";

export function findLocale(
  supportedLocales: Locale[],
  locale: string
): Locale | undefined {
  if (supportedLocales.includes(locale as Locale)) {
    return locale as Locale;
  }
  for (const localeToMatch of supportedLocales) {
    if (localeToMatch.includes(locale.split("-")[0])) {
      return localeToMatch;
    }
  }
  return undefined;
}

export function getBrowserLocale(
  supportedLocales: Locale[],
  fallbackLocale: Locale
): Locale {
  let browserLocale: Locale | undefined;
  if (typeof window !== "undefined" && window.navigator) {
    const lang = window.navigator.language;
    if (lang) {
      browserLocale = findLocale(supportedLocales, lang);
    }
  }

  return browserLocale || fallbackLocale;
}
