import type { SatoriOptions } from "satori";
import satori from "satori/wasm";

import { loadGoogleFont } from "./loadGoogleFont.js";
import { type HonoElement, toReactNode } from "./toReactNode.js";

export type ElementToSvgOptions = Partial<SatoriOptions> & {
  width?: number;
  height?: number;
};

export async function elementToSvg(
  element: HonoElement,
  options: ElementToSvgOptions = {},
) {
  const { fonts, height = 630, width = 1200 } = options;

  const svg = await satori(toReactNode(element), {
    ...options,
    width,
    height,
    fonts: fonts
      ? fonts
      : [
          {
            name: "Open Sans",
            data: await loadGoogleFont({ family: "Open Sans", weight: 600 }),
            weight: 500,
            style: "normal",
          },
        ],
  });

  return svg;
}
