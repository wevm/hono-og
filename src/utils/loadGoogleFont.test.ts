import { expect, test } from "vitest";
import { loadGoogleFont } from "./loadGoogleFont.js";

test("default", async () => {
  expect(
    await loadGoogleFont({
      family: "Roboto",
    }).then((buffer) => new Uint8Array(buffer).toString()),
  ).toMatchSnapshot();

  expect(
    await loadGoogleFont({
      family: "Open Sans",
      weight: 300,
    }).then((buffer) => new Uint8Array(buffer).toString()),
  ).toMatchSnapshot();

  expect(
    await loadGoogleFont({
      family: "Merriweather",
      weight: 300,
      text: "lol",
    }).then((buffer) => new Uint8Array(buffer).toString()),
  ).toMatchSnapshot();
});
