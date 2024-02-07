import * as Og from "@vercel/og";
import type { Child } from "hono/jsx";
import type { HtmlEscapedString } from "hono/utils/html";

type HonoElement = HtmlEscapedString | Promise<HtmlEscapedString>;
type ReactElement = {
  type: string;
  props: object;
  key: string | null;
};

export class ImageResponse extends Og.ImageResponse {
  constructor(
    element: HonoElement,
    options?: ConstructorParameters<typeof Og.ImageResponse>[1],
  ) {
    super(toReactNode(element), options);
  }
}

export const unstable_createNodejsStream = (
  element: HonoElement,
  options?: Parameters<typeof Og.unstable_createNodejsStream>[1],
) => Og.unstable_createNodejsStream(toReactNode(element), options)

export function toReactNode<
  const jsx extends Child,
  returnType = jsx extends HonoElement[]
    ? ReactElement[]
    : jsx extends HonoElement
      ? ReactElement
      : jsx,
>(jsx_: jsx): returnType {
  const jsx = jsx_ as Exclude<Child, Promise<string>>;

  if (Array.isArray(jsx))
    return jsx.map((child) => toReactNode(child)) as returnType;
  if (typeof jsx === "string") return jsx as returnType;
  if (typeof jsx === "number") return jsx as returnType;
  if (typeof jsx.tag === "function") return toReactNode(jsx.children); // fragment

  const { tag, props } = jsx;

  const children = jsx.children?.map((child) =>
    toReactNode(child as HonoElement),
  );

  return {
    type: tag,
    key: null,
    props: {
      ...props,
      children: children.length === 1 ? children[0] : children,
    },
  } as returnType;
}
