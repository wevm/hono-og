import { expect, test } from "vitest";
import { ImageResponse } from "./response.js";

test("png", async () => {
  const response = new ImageResponse(
    <div
      style={{ backgroundColor: "red", fontSize: 60, width: 500, height: 500 }}
    >
      hello
    </div>,
  );
  expect(response).toMatchSnapshot();
  expect(new Uint8Array(await response.arrayBuffer())).toMatchSnapshot();
});

test("svg", async () => {
  const response = new ImageResponse(
    <div
      style={{ backgroundColor: "red", fontSize: 60, width: 500, height: 500 }}
    >
      hello
    </div>,
    { format: "svg" },
  );
  expect(response).toMatchSnapshot();
  expect(new Uint8Array(await response.arrayBuffer())).toMatchSnapshot();
});
