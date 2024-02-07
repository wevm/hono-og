/** @jsx jsx */
/** @jsxImportSource hono/jsx */
/** @jsxFrag */

import { describe, expect, test } from "vitest";
import {
  ImageResponse,
  toReactNode,
  unstable_createNodejsStream,
} from "./index.js";

describe("ImageResponse", () => {
  test("default", () => {
    expect(new ImageResponse(<div>hello world</div>)).toBeDefined();
  });
});

describe("unstable_createNodejsStream", () => {
  test("default", async () => {
    expect(
      await unstable_createNodejsStream(
        <div style={{ display: "flex" }}>hello world</div>,
      ),
    ).toBeDefined();
  });
});

describe("toReactNode", () => {
  test("primitive", () => {
    expect(toReactNode("hello")).toMatchInlineSnapshot(`
      "hello"
    `);
    expect(toReactNode(1)).toMatchInlineSnapshot("1");
    expect(toReactNode([1, "hello"])).toMatchInlineSnapshot(`
			[
			  1,
			  "hello",
			]
		`);
  });

  test("empty", () => {
    expect(toReactNode(<div />)).toMatchInlineSnapshot(`
      {
        "key": null,
        "props": {
          "children": [],
        },
        "type": "div",
      }
    `);
  });

  test("children", () => {
    expect(toReactNode(<div>hello</div>)).toMatchInlineSnapshot(`
			{
			  "key": null,
			  "props": {
			    "children": "hello",
			  },
			  "type": "div",
			}
		`);
  });

  test("JSX children", () => {
    expect(
      toReactNode(
        <div>
          <div>hello</div>
          <div>world</div>
          <div>{69}</div>
        </div>,
      ),
    ).toMatchInlineSnapshot(`
			{
			  "key": null,
			  "props": {
			    "children": [
			      {
			        "key": null,
			        "props": {
			          "children": "hello",
			        },
			        "type": "div",
			      },
			      {
			        "key": null,
			        "props": {
			          "children": "world",
			        },
			        "type": "div",
			      },
			      {
			        "key": null,
			        "props": {
			          "children": 69,
			        },
			        "type": "div",
			      },
			    ],
			  },
			  "type": "div",
			}
		`);
  });

  test("fragment", () => {
    expect(
      toReactNode(
        <div>
          <>
            <div>hello</div>
            <div>world</div>
          </>
        </div>,
      ),
    ).toMatchInlineSnapshot(`
			{
			  "key": null,
			  "props": {
			    "children": [
			      {
			        "key": null,
			        "props": {
			          "children": "hello",
			        },
			        "type": "div",
			      },
			      {
			        "key": null,
			        "props": {
			          "children": "world",
			        },
			        "type": "div",
			      },
			    ],
			  },
			  "type": "div",
			}
		`);
  });

  test("array", () => {
    expect(
      toReactNode([<div>hello</div>, <div>world</div>]),
    ).toMatchInlineSnapshot(`
			[
			  {
			    "key": null,
			    "props": {
			      "children": "hello",
			    },
			    "type": "div",
			  },
			  {
			    "key": null,
			    "props": {
			      "children": "world",
			    },
			    "type": "div",
			  },
			]
		`);
  });

  test("props", () => {
    expect(
      toReactNode(
        <div
          className="lol"
          foo="bar"
          baz={{ barry: true }}
          style={{ backgroundColor: "red" }}
        >
          ok
        </div>,
      ),
    ).toMatchInlineSnapshot(`
			{
			  "key": null,
			  "props": {
			    "baz": {
			      "barry": true,
			    },
			    "children": "ok",
			    "className": "lol",
			    "foo": "bar",
			    "style": {
			      "backgroundColor": "red",
			    },
			  },
			  "type": "div",
			}
		`);
  });
});
