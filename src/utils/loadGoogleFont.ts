// Adapted from: https://github.com/kvnang/workers-og/blob/main/packages/workers-og/src/font.ts

import { LruMap } from "./lru.js";

// 128 * ~0.1MB font = ~12.8MB max memory consumption
const buffers = new LruMap<ArrayBuffer>(128);

export type LoadGoogleFontParameters = {
  family: string;
  weight?: number;
  text?: string;
  style?: "normal" | "italic";
};

export async function loadGoogleFont({
  family,
  weight,
  text,
  style = "normal",
}: LoadGoogleFontParameters): Promise<ArrayBuffer> {
  let fontOptions: string | undefined;

  if (style === "italic") {
    // If weight is specified, we need to expliticly set the weight to have `1:` fallback
    if (weight) fontOptions = `ital,wght@1,${weight}`;
    // If no weight is specified, just append `ital:1` to get italic font.
    else fontOptions = "ital@1";
  } else {
    // If no weight is specified, `fontOptions` should stay empty
    // If weight is specified, append weight parameter
    if (weight) fontOptions = `wght@${weight}`;
  }
  const params: Record<string, string> = {
    family: `${encodeURIComponent(family)}${
      fontOptions ? `:${fontOptions}` : ""
    }`,
  };
  if (text) params.text = text;
  else params.subset = "latin";

  const url = `https://fonts.googleapis.com/css2?${Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&")}`;

  if (buffers.get(url)) return buffers.get(url)!;

  let response = await fetch(url, {
    headers: {
      // construct user agent to get TTF font
      "User-Agent":
        "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
    },
  });
  response = new Response(response.body, response);
  response.headers.append("Cache-Control", "s-maxage=3600");

  const body = await response.text();

  // Get the font URL from the CSS text
  const fontUrl = body.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  )?.[1];
  if (!fontUrl) throw new Error("Could not find font URL");

  const buffer = await fetch(fontUrl).then((res) => res.arrayBuffer());
  buffers.set(url, buffer);
  return buffer;
}
