import {
  type ElementToSvgOptions,
  elementToSvg,
} from "./utils/elementToSvg.js";
import { initializeWasm } from "./utils/initializeWasm.js";
import { svgToPng } from "./utils/svgToPng.js";
import { type HonoElement } from "./utils/toReactNode.js";

export type ImageResponseOptions = ElementToSvgOptions &
  ConstructorParameters<typeof Response>[1] & {
    format?: "png" | "svg" | undefined;
  };

export class ImageResponse extends Response {
  constructor(element: HonoElement, options: ImageResponseOptions = {}) {
    const { format, headers = {}, status = 200, statusText } = options;

    const body = new ReadableStream({
      async start(controller) {
        await initializeWasm();
        const svg = await elementToSvg(element, options);
        const data =
          format === "png"
            ? await svgToPng(svg, options)
            : new TextEncoder().encode(svg);

        controller.enqueue(data);
        controller.close();
      },
    });

    super(body, {
      headers: {
        "Content-Type": format === "png" ? "image/png" : "image/svg+xml",
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
