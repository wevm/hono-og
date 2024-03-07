import * as Og from "@vercel/og";
import { type HonoElement, toReactNode } from "./utils.js";

const pkg = Og;

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
) =>
  "unstable_createNodejsStream" in pkg
    ? pkg.unstable_createNodejsStream(toReactNode(element), options)
    : undefined;
