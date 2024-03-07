import * as Og from "@vercel/og";
import { type HonoElement, toReactNode } from "./utils.js";

const pkg = Og;

function importModule(): Promise<typeof import("@vercel/og")> {
  return import(
    (() => {
      if (typeof process.env.NEXT_RUNTIME === "undefined") return "@vercel/og";
      if (process.env.NEXT_RUNTIME === "edge")
        return "next/dist/compiled/@vercel/og/index.edge.js";
      return "next/dist/compiled/@vercel/og/index.node.js";
    })()
  );
}

export type ImageResponseOptions = ConstructorParameters<
  typeof Og.ImageResponse
>[1];

export class ImageResponse extends Response {
  public static displayName = "ImageResponse";
  constructor(element: HonoElement, options: ImageResponseOptions = {}) {
    const readable = new ReadableStream({
      async start(controller) {
        const OGImageResponse = (await importModule()).ImageResponse;
        const imageResponse = new OGImageResponse(
          toReactNode(element),
          options,
        ) as Response;

        if (!imageResponse.body) return controller.close();

        const reader = imageResponse.body!.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            return controller.close();
          }
          controller.enqueue(value);
        }
      },
    });

    super(readable, {
      headers: {
        "content-type": "image/png",
        "cache-control":
          process.env.NODE_ENV === "development"
            ? "no-cache, no-store"
            : "public, immutable, no-transform, max-age=31536000",
        ...options.headers,
      },
      status: options.status,
      statusText: options.statusText,
    });
  }
}

export const unstable_createNodejsStream = (
  element: HonoElement,
  options?: Parameters<typeof Og.unstable_createNodejsStream>[1],
) =>
  "unstable_createNodejsStream" in pkg
    ? pkg.unstable_createNodejsStream(toReactNode(element), options)
    : undefined;
