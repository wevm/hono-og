import * as Og from "workers-og";
import type { ImageResponseOptions } from "./index.js";
import { type HonoElement, toReactNode } from "./utils.js";

export class ImageResponse extends Og.ImageResponse {
  constructor(element: HonoElement, options?: ImageResponseOptions) {
    super(toReactNode(element), options);
  }
}
