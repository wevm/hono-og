import * as Og from "@vercel/og";
import type { ImageResponseOptions } from "../response.js";
import { type HonoElement, toReactNode } from "../utils/toReactNode.js";

const pkg = Og;

export {
  loadGoogleFont,
  type LoadGoogleFontParameters,
} from "../utils/loadGoogleFont.js";

export class ImageResponse extends Og.ImageResponse {
  constructor(element: HonoElement, options?: ImageResponseOptions) {
    super(toReactNode(element), options);
  }
}

export const unstable_createNodejsStream = (
  element: HonoElement,
  options?: Parameters<typeof Og.unstable_createNodejsStream>[1],
) =>
  "unstable_createNodejsStream" in pkg
    ? pkg.unstable_createNodejsStream(toReactNode(element), options)
    : undefined;
