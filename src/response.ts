import {
  type ElementToSvgOptions,
  elementToSvg,
} from "./utils/elementToSvg.js";
import { initializeWasm } from "./utils/initializeWasm.js";
import { svgToPng } from "./utils/svgToPng.js";
import type { HonoElement } from "./utils/toReactNode.js";

export type ImageResponseOptions = ElementToSvgOptions &
  ConstructorParameters<typeof Response>[1] & {
    format?: "png" | "svg" | undefined;
  };

class ImageResponseBase extends Response {
  constructor(element: HonoElement, options: ImageResponseOptions = {}) {
    const { format, headers = {}, status = 200, statusText } = options;

    const body = new ReadableStream({
      async start(controller) {
        await initializeWasm();
        const svg = await elementToSvg(element, options);
        const data =
          format === "svg"
            ? new TextEncoder().encode(svg)
            : await svgToPng(svg, options);

        controller.enqueue(data);
        controller.close();
      },
    });

    super(body, {
      headers: {
        "Content-Type": format === "svg" ? "image/svg+xml" : "image/png",
        "Cache-Control": options.debug
          ? "no-cache, no-store"
          : "public, immutable, no-transform, max-age=31536000",
        ...headers,
      },
      status,
      statusText,
    });
  }
}

export const ImageResponse = (await (() => {
  if (process.env.VERCEL_URL)
    return import("./exports/vercel.js").then((m) => m.ImageResponse);
  return ImageResponseBase;
})()) as typeof ImageResponseBase;
