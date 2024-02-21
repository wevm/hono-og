import * as Og from "workers-og";
import { type HonoElement, toReactNode } from "./utils.js";

export class ImageResponse extends Og.ImageResponse {
  constructor(
    element: HonoElement,
    options?: ConstructorParameters<typeof Og.ImageResponse>[1],
  ) {
    super(toReactNode(element), options);
  }
}
