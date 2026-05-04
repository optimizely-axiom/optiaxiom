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
import {
  type FileUploadMetadata,
  useProteusDocumentContext,
} from "../proteus-document/ProteusDocumentContext";
import { useProteusDocumentPathContext } from "../proteus-document/ProteusDocumentPathContext";

export type ProteusFileUploadProps = {
  /**
   * File types to accept; array of MIME types or extensions.
   *
   * @example ["image/*", ".pdf"]
   */
  accept?: string[];
  /**
   * The name of the form control element. The resolved metadata object is
   * written at `parentPath/name` in form data once the host's `onUpload`
   * resolves.
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

  const writeValue = useCallback(
    (value: FileUploadMetadata | null) => {
      if (!name) return;
      onDataChange?.(`${parentPath}/${name}`, value);
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
      writeValue(null);
      if (inputRef.current) {
        forceValueChange("");
      }
      try {
        const metadata = await onUpload(file);
        setItem((curr) =>
          curr?.file === file ? { file, status: "complete" } : curr,
        );
        writeValue(metadata);
        if (inputRef.current) {
          forceValueChange("1");
        }
      } catch {
        setItem((curr) =>
          curr?.file === file ? { file, status: "error" } : curr,
        );
      }
    },
    [forceValueChange, onUpload, readOnly, writeValue],
  );

  const handleRemove = useCallback(() => {
    setItem(null);
    writeValue(null);
    if (inputRef.current) {
      forceValueChange("");
    }
  }, [forceValueChange, writeValue]);

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
