import type { ImageResponse as ImageResponseType } from "@vercel/og";
import { type HonoElement, toReactNode } from "./utils.js";

// Determine what instance of the module to import based on the runtime
// (Next.js has it's own compiled version of @vercel/og).
function importModule(): Promise<typeof import("@vercel/og")> {
  return import(
    typeof process.env.NEXT_RUNTIME !== "undefined"
      ? process.env.NEXT_RUNTIME === "edge"
        ? "next/dist/compiled/@vercel/og/index.edge.js"
        : "next/dist/compiled/@vercel/og/index.node.js"
      : "@vercel/og"
  );
}

export type ImageResponseOptions = ConstructorParameters<
  typeof ImageResponseType
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

export const unstable_createNodejsStream = async (
  element: HonoElement,
  options?: Parameters<
    typeof import("@vercel/og").unstable_createNodejsStream
  >[1],
) => {
  const mod = await importModule();
  "unstable_createNodejsStream" in mod
    ? mod.unstable_createNodejsStream(toReactNode(element), options)
    : undefined;
};
