export const locales = [
  {
    key: "en-GB",
    internationalName: "English (GB)",
    localName: "English (GB)",
  },
  {
    key: "ru",
    internationalName: "Russian",
    localName: "Русский",
  },
  {
    key: "he",
    internationalName: "Hebrew",
    localName: "עברית",
  },
] as const;

export type Locale = typeof locales[number]["key"];
