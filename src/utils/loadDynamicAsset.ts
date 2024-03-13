import type { SatoriOptions } from "satori";
import { apis, getIconCode, loadEmoji } from "./emoji.js";
import { loadGoogleFont } from "./loadGoogleFont.js";

const languageFontMap = {
  "ja-JP": "Noto Sans JP",
  "ko-KR": "Noto Sans KR",
  "zh-CN": "Noto Sans SC",
  "zh-TW": "Noto Sans TC",
  "zh-HK": "Noto Sans HK",
  "th-TH": "Noto Sans Thai",
  "bn-IN": "Noto Sans Bengali",
  "ar-AR": "Noto Sans Arabic",
  "ta-IN": "Noto Sans Tamil",
  "ml-IN": "Noto Sans Malayalam",
  "he-IL": "Noto Sans Hebrew",
  "te-IN": "Noto Sans Telugu",
  devanagari: "Noto Sans Devanagari",
  kannada: "Noto Sans Kannada",
  symbol: ["Noto Sans Symbols", "Noto Sans Symbols 2"],
  math: "Noto Sans Math",
  unknown: "Noto Sans",
};

export async function loadDynamicAsset(
  emojiType: keyof typeof apis,
  code: string,
  text: string,
): Promise<string | SatoriOptions["fonts"]> {
  if (code === "emoji")
    // It's an emoji, load the image.
    return `data:image/svg+xml;base64,${btoa(
      await loadEmoji(emojiType, getIconCode(text)),
    )}`;

  const codes = code.split("|");

  // Try to load from Google Fonts.
  const names = codes
    .map((code) => languageFontMap[code as keyof typeof languageFontMap])
    .filter(Boolean);

  try {
    return await Promise.all(
      names.flat().map(async (name, index) => {
        return {
          name: `satori_${codes[index]}_fallback_${text}`,
          data: await loadGoogleFont({ family: name, weight: 400 }),
          weight: 400 as const,
          style: "normal" as const,
          lang: codes[index] as string,
        };
      }),
    );
  } catch (e) {
    console.error("Failed to load dynamic font for", text, ". Error:", e);
    return [];
  }
}
