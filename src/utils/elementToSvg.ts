import type { SatoriOptions } from "satori";
import satori from "satori/wasm";

import type { Emoji } from "./emoji.js";
import { loadDynamicAsset } from "./loadDynamicAsset.js";
import { loadGoogleFont } from "./loadGoogleFont.js";
import { type HonoElement, toReactNode } from "./toReactNode.js";

export type ElementToSvgOptions = Partial<SatoriOptions> & {
  emoji?: Emoji | undefined;
  width?: number | undefined;
  height?: number | undefined;
};

export async function elementToSvg(
  element: HonoElement,
  options: ElementToSvgOptions = {},
) {
  const {
    emoji = "twemoji",
    fonts = [
      {
        name: "Noto Sans",
        data: await loadGoogleFont({ family: "Noto Sans", weight: 400 }),
        weight: 400,
        style: "normal",
      },
    ],
    height = 630,
    width = 1200,
  } = options;

  const svg = await satori(toReactNode(element), {
    ...options,
    width,
    height,
    fonts,
    loadAdditionalAsset: (code, text) => {
      return loadDynamicAsset(emoji, code, text);
    },
  });

  return svg;
}
