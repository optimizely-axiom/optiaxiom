import { Flex } from "@optiaxiom/react";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadList,
  type FileUploadListProps,
  FileUploadTrigger,
} from "@optiaxiom/react/unstable";
import { useCallback, useState } from "react";

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
type Entry = {
  id: string;
  item: Item;
  url?: string;
};

export function ProteusFileUpload({ accept, name }: ProteusFileUploadProps) {
  const { onDataChange, onUpload, readOnly } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusFileUpload",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/proteus/ProteusFileUpload",
  );

  const [entry, setEntry] = useState<Entry | null>(null);

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
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()}`;
      setEntry({ id, item: { file, status: "uploading" } });
      writeUrl(null);
      try {
        const url = await onUpload(file);
        setEntry((curr) =>
          curr?.id === id
            ? { ...curr, item: { file, status: "complete" }, url }
            : curr,
        );
        writeUrl(url);
      } catch {
        setEntry((curr) =>
          curr?.id === id
            ? { ...curr, item: { file, status: "error" } }
            : curr,
        );
      }
    },
    [onUpload, readOnly, writeUrl],
  );

  const handleRemove = useCallback(() => {
    setEntry(null);
    writeUrl(null);
  }, [writeUrl]);

  return (
    <FileUpload
      accept={accept}
      disabled={!onUpload || readOnly}
      onFilesDrop={handleFilesDrop}
    >
      <Flex flexDirection="column" gap="8">
        {entry ? (
          <FileUploadList items={[entry.item]} onRemove={handleRemove} />
        ) : (
          <FileUploadTrigger alignSelf="start" />
        )}
      </Flex>
      <FileUploadDropzone overlay />
    </FileUpload>
  );
}

ProteusFileUpload.displayName = "@optiaxiom/proteus/ProteusFileUpload";
