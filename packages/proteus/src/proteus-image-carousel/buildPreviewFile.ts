import type { ProteusPreviewFile } from "../proteus-document/schemas";

/** One image entry from the `present_images` tool; legacy cards carry only `{src, alt}`. */
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

/** Build a preview file from a carousel image, falling back to a `HEAD` request then URL guessing for legacy cards. */
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

function extensionFromName(name: string): string | undefined {
  const dot = name.lastIndexOf(".");
  return dot > 0 && dot < name.length - 1
    ? name.slice(dot + 1).toUpperCase()
    : undefined;
}

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

function getMimeFromUrl(src: string): string {
  const ext = src.split("?")[0].split(".").pop()?.toLowerCase() ?? "";
  return MIME_MAP[ext] ?? "image/jpeg";
}

function stripExtension(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot > 0 ? name.slice(0, dot) : name;
}
