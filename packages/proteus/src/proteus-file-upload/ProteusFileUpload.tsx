import { Flex } from "@optiaxiom/react";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadList,
  type FileUploadListProps,
  FileUploadTrigger,
  VisuallyHidden,
} from "@optiaxiom/react/unstable";
import { useCallback, useRef, useState } from "react";

import { useObserveValue } from "../hooks";
import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { useProteusDocumentPathContext } from "../proteus-document/ProteusDocumentPathContext";

export type ProteusFileUploadProps = {
  /**
   * File types to accept; array of MIME types or extensions.
   *
   * @example ["image/*", ".pdf"]
   */
  accept?: string[];
  /**
   * The name of the form control element. The resolved URL is written at
   * `parentPath/name` in form data once the host's `onUpload` resolves.
   */
  name?: string;
  /**
   * Whether a file is required.
   */
  required?: boolean;
};

type Item = FileUploadListProps["items"][number];

export function ProteusFileUpload({
  accept,
  name,
  required,
}: ProteusFileUploadProps) {
  const { onDataChange, onUpload, readOnly } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusFileUpload",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/proteus/ProteusFileUpload",
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const [item, setItem] = useState<Item | null>(null);
  const forceValueChange = useObserveValue(inputRef);

  const writeUrl = useCallback(
    (url: null | string) => {
      if (!name) return;
      onDataChange?.(`${parentPath}/${name}`, url);
    },
    [name, onDataChange, parentPath],
  );

  const handleFilesDrop = useCallback(
    async (incoming: File[]) => {
      if (!onUpload || readOnly || incoming.length === 0) {
        return;
      }
      const file = incoming[0];
      setItem({ file, status: "uploading" });
      writeUrl(null);
      if (inputRef.current) {
        forceValueChange("");
      }
      try {
        const url = await onUpload(file);
        setItem((curr) =>
          curr?.file === file ? { file, status: "complete" } : curr,
        );
        writeUrl(url);
        if (inputRef.current) {
          forceValueChange("1");
        }
      } catch {
        setItem((curr) =>
          curr?.file === file ? { file, status: "error" } : curr,
        );
      }
    },
    [forceValueChange, onUpload, readOnly, writeUrl],
  );

  const handleRemove = useCallback(() => {
    setItem(null);
    writeUrl(null);
    if (inputRef.current) {
      forceValueChange("");
    }
  }, [forceValueChange, writeUrl]);

  return (
    <FileUpload
      accept={accept}
      disabled={!onUpload || readOnly}
      onFilesDrop={handleFilesDrop}
    >
      <VisuallyHidden asChild>
        <input
          aria-hidden
          name={name}
          ref={inputRef}
          required={required}
          tabIndex={-1}
        />
      </VisuallyHidden>
      {item ? (
        <Flex flexDirection="column" gap="8">
          <FileUploadList items={[item]} onRemove={handleRemove} />
          <FileUploadDropzone overlay />
        </Flex>
      ) : (
        <FileUploadDropzone>
          <FileUploadTrigger />
        </FileUploadDropzone>
      )}
    </FileUpload>
  );
}

ProteusFileUpload.displayName = "@optiaxiom/proteus/ProteusFileUpload";
