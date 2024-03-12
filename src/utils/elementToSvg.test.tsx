import { expect, test } from "vitest";
import { elementToSvg } from "./elementToSvg.js";
import { initializeWasm } from "./initializeWasm.js";

test("default", async () => {
  await initializeWasm();
  const svg = await elementToSvg(
    <div
      style={{ backgroundColor: "red", fontSize: 60, width: 500, height: 500 }}
    >
      hello
    </div>,
  );
  expect(svg).toMatchInlineSnapshot(
    `"<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg"><mask id="satori_om-id"><rect x="0" y="0" width="500" height="500" fill="#fff"/></mask><rect x="0" y="0" width="500" height="500" fill="red"/><path fill="black" d="M4.9 18.8L11.8 18.8L11.8 30.3Q11.8 32.1 11.7 33.8Q11.6 35.5 11.5 36.4L11.5 36.4L11.9 36.4Q12.9 34.7 14.4 33.6Q15.9 32.5 17.7 32.0Q19.6 31.4 21.7 31.4L21.7 31.4Q25.4 31.4 28.0 32.6Q30.6 33.9 32.0 36.5Q33.4 39.1 33.4 43.3L33.4 43.3L33.4 64.4L26.5 64.4L26.5 44.6Q26.5 40.8 25.0 38.9Q23.4 37.0 20.2 37.0L20.2 37.0Q17.1 37.0 15.2 38.3Q13.4 39.6 12.6 42.1Q11.8 44.7 11.8 48.3L11.8 48.3L11.8 64.4L4.9 64.4L4.9 18.8ZM56.0 31.4L56.0 31.4Q60.3 31.4 63.4 33.2Q66.5 34.9 68.2 38.2Q69.8 41.5 69.8 46.1L69.8 46.1L69.8 49.8L48.2 49.8Q48.3 54.5 50.7 57.0Q53.1 59.6 57.5 59.6L57.5 59.6Q60.6 59.6 63.1 59.0Q65.6 58.4 68.2 57.2L68.2 57.2L68.2 62.8Q65.8 63.9 63.3 64.5Q60.7 65.0 57.2 65.0L57.2 65.0Q52.4 65.0 48.8 63.1Q45.2 61.3 43.2 57.6Q41.1 53.9 41.1 48.4L41.1 48.4Q41.1 43.0 43.0 39.2Q44.8 35.4 48.2 33.4Q51.5 31.4 56.0 31.4ZM56.0 36.6L56.0 36.6Q52.7 36.6 50.7 38.7Q48.7 40.8 48.3 44.8L48.3 44.8L63.1 44.8Q63.1 42.4 62.3 40.5Q61.5 38.7 60.0 37.6Q58.4 36.6 56.0 36.6ZM84.5 18.8L84.5 64.4L77.6 64.4L77.6 18.8L84.5 18.8ZM101.3 18.8L101.3 64.4L94.3 64.4L94.3 18.8L101.3 18.8ZM139.8 48.1L139.8 48.1Q139.8 52.2 138.7 55.3Q137.7 58.4 135.6 60.6Q133.6 62.7 130.8 63.9Q127.9 65.0 124.4 65.0L124.4 65.0Q121.0 65.0 118.2 63.9Q115.5 62.7 113.4 60.6Q111.4 58.4 110.3 55.3Q109.2 52.2 109.2 48.1L109.2 48.1Q109.2 42.8 111.0 39.0Q112.9 35.3 116.3 33.3Q119.8 31.4 124.6 31.4L124.6 31.4Q129.1 31.4 132.5 33.3Q135.9 35.3 137.8 39.0Q139.8 42.8 139.8 48.1ZM116.3 48.1L116.3 48.1Q116.3 51.7 117.1 54.2Q118.0 56.7 119.8 58.0Q121.6 59.4 124.5 59.4L124.5 59.4Q127.4 59.4 129.2 58.0Q131.0 56.7 131.8 54.2Q132.7 51.7 132.7 48.1L132.7 48.1Q132.7 44.6 131.8 42.1Q131.0 39.6 129.2 38.3Q127.4 37.0 124.5 37.0L124.5 37.0Q120.2 37.0 118.2 39.9Q116.3 42.8 116.3 48.1Z "/></svg>"`,
  );
});