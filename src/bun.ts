import * as Og from "@wevm/vercel-og";
import { type HonoElement, toReactNode } from "./utils.js";

export type ImageResponseOptions = ConstructorParameters<
  typeof Og.ImageResponse
>[1];

export class ImageResponse extends Og.ImageResponse {
  constructor(element: HonoElement, options?: ImageResponseOptions) {
    super(toReactNode(element), options);
  }
}

export const unstable_createNodejsStream = (
  element: HonoElement,
  options?: Parameters<typeof Og.unstable_createNodejsStream>[1],
) => Og.unstable_createNodejsStream(toReactNode(element), options);
