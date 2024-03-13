/** @jsx jsx */
/** @jsxImportSource hono/jsx */
/** @jsxFrag */

import { describe, expect, test } from "vitest";
import { ImageResponse, unstable_createNodejsStream } from "./vercel.js";

describe("ImageResponse", () => {
  test("default", () => {
    expect(new ImageResponse(<div>hello world</div>)).toBeDefined();
  });
});

describe("unstable_createNodejsStream", () => {
  test("default", async () => {
    expect(
      await unstable_createNodejsStream(
        <div style={{ display: "flex" }}>hello world</div>,
      ),
    ).toBeDefined();
  });
});
