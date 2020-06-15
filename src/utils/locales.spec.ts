import { findLocale } from "./locales";
import { Locale } from "src/config/locales";

const supportedLocales = ["en-GB", "en-AU"] as Locale[];

it("should return en-GB for en-GB", () => {
  expect(findLocale(supportedLocales, "en-GB")).toBe("en-GB");
});

it("should return en-AU for en-AU", () => {
  expect(findLocale(supportedLocales, "en-AU")).toBe("en-AU");
});

it("should return en-GB for en", () => {
  expect(findLocale(supportedLocales, "en")).toBe("en-GB");
});

it("should return en-GB for en-US ", () => {
  expect(findLocale(supportedLocales, "en-US")).toBe("en-GB");
});

it("Should return undefined if not found", () => {
  expect(findLocale(supportedLocales, "foo")).toBeUndefined();
});
