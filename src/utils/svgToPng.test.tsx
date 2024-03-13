import { expect, test } from "vitest";
import { elementToSvg } from "./elementToSvg.js";
import { initializeWasm } from "./initializeWasm.js";
import { svgToPng } from "./svgToPng.js";

test.skip("default", async () => {
  await initializeWasm();
  const svg = await elementToSvg(
    <div
      style={{ backgroundColor: "red", fontSize: 60, width: 500, height: 500 }}
    >
      hello
    </div>,
  );
  const png = await svgToPng(svg);
  expect(png).toMatchSnapshot();
});
