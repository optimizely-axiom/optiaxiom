import type { BoxProps } from "../box";

import { type RemoteFile, useFileUploadContext } from "./FileUploadContext";

export const useFileUploadDrop = ({
  onDragOver,
  onDrop,
  ...props
}: BoxProps = {}): BoxProps => {
  const { accept, disabled, onFilesDrop } = useFileUploadContext(
    "@optiaxiom/react/useFileUploadDrop",
  );

  return {
    ...props,
    onDragOver: (event) => {
      onDragOver?.(event);
      if (disabled) {
        return;
      }

      event.preventDefault();
    },
    onDrop: (event) => {
      onDrop?.(event);
      if (disabled) {
        return;
      }

      event.preventDefault();
      onFilesDrop?.(
        (event.dataTransfer.items
          ? Array.from(event.dataTransfer.items).map((item) => {
              if (item.kind === "file") {
                return item.getAsFile();
              } else if (
                item.type === "opal-chat-dnd-data" ||
                item.type === "opal-host-dnd-data"
              ) {
                try {
                  const data = JSON.parse(
                    event.dataTransfer.getData(item.type),
                  ) as {
                    link: string;
                    mime_type: string;
                    name?: string;
                  };
                  return {
                    name: data.name || "",
                    type: data.mime_type || "",
                    url: data.link,
                  };
                } catch {
                  /* empty */
                }
              }
              return null;
            })
          : Array.from(event.dataTransfer.files)
        ).filter((file) => isValidFile(file, accept)),
      );
    },
  };
};

/**
 * Copied and modified from https://github.com/dropzone/dropzone
 */
function isValidFile(
  file: File | null | RemoteFile,
  accept: string,
): file is File | RemoteFile {
  if (!file) {
    return false;
  }
  if (!accept) {
    return true;
  }

  const acceptedFiles = accept.split(",");
  if (acceptedFiles.length === 0) {
    return true;
  }
  const fileName = "name" in file ? file.name : "";
  const mimeType = (file.type || "").toLowerCase();
  const baseMimeType = mimeType.replace(/\/.*$/, "");

  return acceptedFiles.some((type) => {
    const validType = type.trim().toLowerCase();
    if (validType.charAt(0) === ".") {
      return fileName.toLowerCase().endsWith(validType);
    } else if (validType.endsWith("/*")) {
      // This is something like a image/* mime type
      return baseMimeType === validType.replace(/\/.*$/, "");
    }
    return mimeType === validType;
  });
}
