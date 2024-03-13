import { bench, expect } from "vitest";
import { ImageResponse } from "./response.js";

bench("png", async () => {
  const response = new ImageResponse(
    <div
      style={{ backgroundColor: "red", fontSize: 60, width: 500, height: 500 }}
    >
      hello
    </div>,
  );
  expect(response).toBeDefined();
  expect(new Uint8Array(await response.arrayBuffer())).toBeDefined();
});

bench("svg", async () => {
  const response = new ImageResponse(
    <div
      style={{ backgroundColor: "red", fontSize: 60, width: 500, height: 500 }}
    >
      hello
    </div>,
    { format: "svg" },
  );
  expect(response).toBeDefined();
  expect(new Uint8Array(await response.arrayBuffer())).toBeDefined();
});
