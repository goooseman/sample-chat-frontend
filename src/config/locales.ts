export const locales = ["en-GB", "ru", "he"] as const;

export type Locale = typeof locales[number];
