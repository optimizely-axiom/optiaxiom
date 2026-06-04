import { afterEach, describe, expect, it, vi } from "vitest";

import { buildPreviewFile } from "./buildPreviewFile";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("buildPreviewFile", () => {
  it("uses enriched metadata directly without a network call", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const file = await buildPreviewFile({
      alt: "chart.png",
      extension: "PNG",
      file_link: "https://opal.example.com/v2/files/t1/get?path=/chart.png",
      full_name: "chart.png",
      mime_type: "image/png",
      name: "Chart",
      src: "https://opal.example.com/v2/files/t1/get?path=/chart.png",
    });

    expect(fetchMock).not.toHaveBeenCalled();
    expect(file).toEqual({
      extension: "PNG",
      file_link: "https://opal.example.com/v2/files/t1/get?path=/chart.png",
      full_name: "chart.png",
      mime_type: "image/png",
      name: "Chart",
    });
  });

  it("recovers metadata from a HEAD request for legacy {src, alt} cards", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      headers: new Headers({
        "content-disposition": 'attachment; filename="diagram.webp"',
        "content-type": "image/webp; charset=binary",
      }),
      ok: true,
    });
    vi.stubGlobal("fetch", fetchMock);

    const file = await buildPreviewFile({
      alt: "A diagram",
      src: "https://opal.example.com/v1/file/abc-123",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://opal.example.com/v1/file/abc-123",
      { credentials: "include", method: "HEAD" },
    );
    expect(file).toEqual({
      extension: "WEBP",
      file_link: "https://opal.example.com/v1/file/abc-123",
      full_name: "diagram.webp",
      mime_type: "image/webp",
      name: "diagram",
    });
  });

  it("falls back to the URL-extension MIME guess when the HEAD request fails", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("network"));
    vi.stubGlobal("fetch", fetchMock);

    const file = await buildPreviewFile({
      alt: "Hero image",
      src: "https://opal.example.com/assets/hero.png?token=xyz",
    });

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(file).toEqual({
      extension: "PNG",
      file_link: "https://opal.example.com/assets/hero.png?token=xyz",
      full_name: "Hero image",
      mime_type: "image/png",
      name: "Hero image",
    });
  });

  it("defaults to image/jpeg when neither HEAD nor the URL reveal a type", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      headers: new Headers(),
      ok: false,
    });
    vi.stubGlobal("fetch", fetchMock);

    const file = await buildPreviewFile({
      alt: "Untitled",
      src: "https://opal.example.com/v1/file/no-extension",
    });

    expect(file.mime_type).toBe("image/jpeg");
    expect(file.file_link).toBe(
      "https://opal.example.com/v1/file/no-extension",
    );
    expect(file.full_name).toBe("Untitled");
  });
});
