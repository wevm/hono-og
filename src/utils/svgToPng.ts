import { Resvg } from "@resvg/resvg-wasm";

export type SvgToPngOptions = {
  width?: number;
};

export async function svgToPng(svg: string, options: SvgToPngOptions = {}) {
  const { width = 630 } = options;
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width" as const,
      value: width,
    },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return pngBuffer;
}
