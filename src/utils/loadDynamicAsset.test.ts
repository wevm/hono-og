import { expect, test } from "vitest";
import { loadDynamicAsset } from "./loadDynamicAsset.js";

test("emoji", async () => {
  expect(await loadDynamicAsset("twemoji", "emoji", "👋")).toMatchSnapshot();
});

test("lang", async () => {
  expect(
    await loadDynamicAsset("twemoji", "ja-JP|zh-CN|zh-TW|zh-HK", "你好"),
  ).toMatchSnapshot();
});
