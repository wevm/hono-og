import type { EdgeImageResponse } from "../index.edge.js";
import { FigmaImageResponseProps } from "../types.js";
declare type InternalFigmaImageResponseProps = FigmaImageResponseProps & {
  Response: EdgeImageResponse;
};
export declare const FigmaImageResponse: ({
  url,
  template,
  fonts,
  imageResponseOptions,
  Response,
}: InternalFigmaImageResponseProps) => Promise<
  import("../index.edge").ImageResponse
>;
export {};
