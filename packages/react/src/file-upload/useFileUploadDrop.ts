import type { BoxProps } from "../box";

import { useFileUploadContext } from "./FileUploadContext";

export const useFileUploadDrop = ({
  onDragOver,
  onDrop,
  ...props
}: BoxProps = {}): BoxProps => {
  const { accept, onFilesDrop } = useFileUploadContext(
    "@optiaxiom/react/useFileUploadDrop",
  );

  return {
    ...props,
    onDragOver: (event) => {
      onDragOver?.(event);

      event.preventDefault();
    },
    onDrop: (event) => {
      onDrop?.(event);

      event.preventDefault();

      onFilesDrop?.(
        (event.dataTransfer.items
          ? Array.from(event.dataTransfer.items).flatMap((item) => {
              const file =
                item.kind === "file"
                  ? item.getAsFile()
                  : new Blob([event.dataTransfer.getData(item.type)], {
                      type: item.type,
                    });
              return file ? [file] : [];
            })
          : Array.from(event.dataTransfer.files)
        ).filter((file) => isValidFile(file, accept)),
      );
    },
  };
};

/**
 * Copied from https://github.com/dropzone/dropzone
 */
function isValidFile(file: Blob | File, accept: string) {
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
