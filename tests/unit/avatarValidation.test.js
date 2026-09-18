import { describe, expect, test } from "vitest";
import { parseImageDataUrl } from "../../server/domainHelpers.js";

describe("avatar validation", () => {
  test("accepts supported image signatures", () => {
    const png = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Y9ZJ4sAAAAASUVORK5CYII=";
    expect(parseImageDataUrl(png)).toMatchObject({ mime: "image/png" });
  });

  test("rejects bytes that do not match the declared image type", () => {
    const disguisedHtml = `data:image/png;base64,${Buffer.from("<html>not an image</html>").toString("base64")}`;
    const mislabeledPng = `data:image/jpeg;base64,${Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).toString("base64")}`;
    expect(parseImageDataUrl(disguisedHtml)).toBeNull();
    expect(parseImageDataUrl(mislabeledPng)).toBeNull();
  });
});
