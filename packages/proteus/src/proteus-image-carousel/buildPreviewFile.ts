import type { ProteusPreviewFile } from "../proteus-document/schemas";

/**
 * One image entry as it arrives from the `present_images` tool. The backend
 * enriches each item ({src, alt, name, full_name, extension, mime_type,
 * file_link, kind}); legacy already-rendered cards only carry {src, alt}.
 */
export type PreviewSource = {
  alt?: string;
  extension?: string;
  file_link?: string;
  full_name?: string;
  mime_type?: string;
  name?: string;
  src: string;
};

const MIME_MAP: Record<string, string> = {
  gif: "image/gif",
  ico: "image/x-icon",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  png: "image/png",
  svg: "image/svg+xml",
  webp: "image/webp",
};

type HeadMetadata = { filename?: string; mime_type?: string };

/**
 * Build the {@link ProteusPreviewFile} the preview panel consumes from a
 * carousel image.
 *
 * - Enriched cards already carry `mime_type` (and friends) from the backend, so
 *   we use them directly with no network call.
 * - Legacy `{src, alt}`-only cards trigger a `HEAD` request to recover the real
 *   `Content-Type` and filename. The URL-extension guess is only a last resort
 *   if the HEAD request fails or omits headers.
 */
export async function buildPreviewFile(
  image: PreviewSource,
): Promise<ProteusPreviewFile> {
  const fileLink = image.file_link ?? image.src;

  if (image.mime_type) {
    return assemble(
      fileLink,
      image.mime_type,
      image.full_name ?? image.alt,
      image.extension,
      image.name,
    );
  }

  const head = await fetchHeadMetadata(fileLink);
  return assemble(
    fileLink,
    head.mime_type ?? getMimeFromUrl(fileLink),
    image.full_name ?? head.filename ?? image.alt,
    image.extension,
    image.name,
  );
}

function assemble(
  fileLink: string,
  mime_type: string,
  fullName: string | undefined,
  extension: string | undefined,
  name: string | undefined,
): ProteusPreviewFile {
  const full_name =
    fullName ??
    filenameFromUrl(fileLink) ??
    `image.${extensionFromMime(mime_type).toLowerCase()}`;
  return {
    extension:
      extension ?? extensionFromName(full_name) ?? extensionFromMime(mime_type),
    file_link: fileLink,
    full_name,
    mime_type,
    name: name ?? stripExtension(full_name),
  };
}

function extensionFromMime(mime: string): string {
  const sub = mime.split("/")[1]?.split("+")[0] ?? "";
  if (!sub) return "FILE";
  return (sub === "jpeg" ? "jpg" : sub).toUpperCase();
}

/** Uppercased extension label (matches the backend's `_extension_label`). */
function extensionFromName(name: string): string | undefined {
  const dot = name.lastIndexOf(".");
  return dot > 0 && dot < name.length - 1
    ? name.slice(dot + 1).toUpperCase()
    : undefined;
}

/** HEAD the URL to recover the real Content-Type and filename. */
async function fetchHeadMetadata(url: string): Promise<HeadMetadata> {
  try {
    const response = await fetch(url, {
      credentials: "include",
      method: "HEAD",
    });
    if (!response.ok) return {};
    const contentType = response.headers.get("content-type");
    return {
      filename: filenameFromContentDisposition(
        response.headers.get("content-disposition"),
      ),
      mime_type: contentType ? contentType.split(";")[0].trim() : undefined,
    };
  } catch {
    return {};
  }
}

/** Parse `filename` from a Content-Disposition header (RFC 5987 + plain). */
function filenameFromContentDisposition(
  header: null | string,
): string | undefined {
  if (!header) return undefined;
  const star = /filename\*=(?:UTF-8'')?([^;]+)/i.exec(header);
  if (star?.[1]) {
    try {
      return decodeURIComponent(star[1].trim().replace(/^"|"$/g, ""));
    } catch {
      return star[1].trim().replace(/^"|"$/g, "");
    }
  }
  const plain = /filename="?([^";]+)"?/i.exec(header);
  return plain?.[1]?.trim();
}

function filenameFromUrl(src: string): string | undefined {
  const last = src.split("?")[0].split("/").pop();
  return last ? decodeURIComponent(last) : undefined;
}

/** Last-resort MIME guess from a URL's extension when no metadata is available. */
function getMimeFromUrl(src: string): string {
  const ext = src.split("?")[0].split(".").pop()?.toLowerCase() ?? "";
  return MIME_MAP[ext] ?? "image/jpeg";
}

function stripExtension(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot > 0 ? name.slice(0, dot) : name;
}
