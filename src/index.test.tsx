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
    expect(new ImageResponse(<div>hello world</div>)).toMatchInlineSnapshot(`
			ImageResponse {
			  Symbol(realm): {
			    "settingsObject": {},
			  },
			  Symbol(state): {
			    "aborted": false,
			    "body": {
			      "length": null,
			      "source": null,
			      "stream": ReadableStream {
			        Symbol(kType): "ReadableStream",
			        Symbol(kState): {
			          "controller": ReadableStreamDefaultController {
			            Symbol(kType): "ReadableStreamDefaultController",
			            Symbol(kState): {
			              "cancelAlgorithm": [Function],
			              "closeRequested": false,
			              "highWaterMark": 1,
			              "pullAgain": false,
			              "pullAlgorithm": [Function],
			              "pulling": false,
			              "queue": [],
			              "queueTotalSize": 0,
			              "sizeAlgorithm": [Function],
			              "started": false,
			              "stream": [Circular],
			            },
			          },
			          "disturbed": false,
			          "reader": undefined,
			          "state": "readable",
			          "storedError": undefined,
			          "stream": undefined,
			          "transfer": {
			            "port1": undefined,
			            "port2": undefined,
			            "promise": undefined,
			            "writable": undefined,
			          },
			        },
			        Symbol(nodejs.webstream.isClosedPromise): {
			          "promise": Promise {},
			          "reject": [Function],
			          "resolve": [Function],
			        },
			        Symbol(nodejs.webstream.controllerErrorFunction): [Function],
			      },
			    },
			    "cacheState": "",
			    "headersList": HeadersList {
			      "cookies": null,
			      Symbol(headers map): Map {
			        "content-type" => {
			          "name": "content-type",
			          "value": "image/png",
			        },
			        "cache-control" => {
			          "name": "cache-control",
			          "value": "public, immutable, no-transform, max-age=31536000",
			        },
			      },
			      Symbol(headers map sorted): null,
			    },
			    "rangeRequested": false,
			    "requestIncludesCredentials": false,
			    "status": 200,
			    "statusText": "",
			    "timingAllowPassed": false,
			    "timingInfo": null,
			    "type": "default",
			    "urlList": [],
			  },
			  Symbol(headers): Headers {
			    Symbol(headers list): HeadersList {
			      "cookies": null,
			      Symbol(headers map): Map {
			        "content-type" => {
			          "name": "content-type",
			          "value": "image/png",
			        },
			        "cache-control" => {
			          "name": "cache-control",
			          "value": "public, immutable, no-transform, max-age=31536000",
			        },
			      },
			      Symbol(headers map sorted): null,
			    },
			    Symbol(guard): "response",
			    Symbol(realm): {
			      "settingsObject": {},
			    },
			  },
			}
		`);
  });
});

describe("unstable_createNodejsStream", () => {
  test("default", () => {
    expect(
      unstable_createNodejsStream(
        <div style={{ display: "flex" }}>hello world</div>,
      ),
    ).toMatchInlineSnapshot(`Promise {}`);
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
