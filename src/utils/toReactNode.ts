import type { Child } from "hono/jsx";
import type { HtmlEscapedString } from "hono/utils/html";

export type HonoElement = HtmlEscapedString | Promise<HtmlEscapedString>;
export type ReactElement = {
  type: string;
  props: object;
  key: string | null;
};

export function toReactNode<
  const jsx extends Child,
  returnType = jsx extends HonoElement[]
    ? ReactElement[]
    : jsx extends HonoElement
      ? ReactElement
      : jsx,
>(jsx_: jsx): returnType {
  const jsx = jsx_ as Exclude<Child, Promise<string>>;

  if (!jsx) return null as returnType;
  if (Array.isArray(jsx))
    return jsx.map((child) => toReactNode(child)) as returnType;
  if (typeof jsx === "string") return jsx as returnType;
  if (typeof jsx === "number") return jsx as returnType;
  if (typeof jsx.tag === "function") {
    const node = jsx.tag({ ...jsx.props, children: jsx.children });
    if (!node.tag) return toReactNode(jsx.children); // fragment
    return toReactNode(node); // component
  }

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
