import * as Og from "workers-og";
import type { ImageResponseOptions } from "../response.js";
import { type HonoElement, toReactNode } from "../utils/toReactNode.js";

export {
  loadGoogleFont,
  type LoadGoogleFontParameters,
} from "../utils/loadGoogleFont.js";

export class ImageResponse extends Og.ImageResponse {
  constructor(element: HonoElement, options?: ImageResponseOptions) {
    super(toReactNode(element), options);
  }
}
