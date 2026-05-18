import { IconPlus } from "@optiaxiom/icons";
import { Flex, toaster } from "@optiaxiom/react";
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
   * Maximum number of files allowed. When set to `1` the field is in
   * single-file mode; any other value (or omitted) allows multiple uploads.
   */
  maxFiles?: number;
  /**
   * Minimum number of files required.
   */
  minFiles?: number;
  /**
   * The name of the form control element. The resolved metadata array is
   * written at `parentPath/name` in form data once the host's `onUpload`
   * resolves.
   */
  name?: string;
};

type Item = FileUploadListProps["items"][number] & {
  metadata?: FileUploadMetadata;
};

export function ProteusFileUpload({
  accept,
  maxFiles,
  minFiles = 0,
  name,
}: ProteusFileUploadProps) {
  const { onDataChange, onUpload, readOnly } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusFileUpload",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/proteus/ProteusFileUpload",
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef<Item[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const forceValueChange = useObserveValue(inputRef);

  const multiple = maxFiles !== 1;
  const atMax = multiple && maxFiles !== undefined && items.length >= maxFiles;

  const writeValue = useCallback(() => {
    setItems(itemsRef.current);
    if (inputRef.current) {
      forceValueChange(
        itemsRef.current
          .filter((item) => item.status === "complete")
          .length.toString(),
      );
    }
    if (name) {
      const value = itemsRef.current
        .filter((item) => item.status === "complete")
        .map((item) => item.metadata)
        .filter((metadata) => !!metadata);
      onDataChange?.(`${parentPath}/${name}`, value);
    }
  }, [forceValueChange, name, onDataChange, parentPath]);

  const handleFilesDrop = useCallback(
    async (incoming: File[]) => {
      let skipped = 0;
      if (maxFiles !== undefined) {
        const existing = multiple ? itemsRef.current.length : 0;
        const remaining = Math.max(0, maxFiles - existing);
        if (incoming.length > remaining) {
          skipped = incoming.length - remaining;
          incoming = incoming.slice(0, remaining);
        }
      }
      if (skipped > 0) {
        const accepted = incoming.length;
        const skippedWord = skipped === 1 ? "was" : "were";
        toaster.create(
          accepted > 0
            ? `Added ${accepted} file${accepted === 1 ? "" : "s"}. ${skipped} ${skippedWord} skipped because the limit is ${maxFiles}.`
            : `${skipped} file${skipped === 1 ? "" : "s"} ${skippedWord} skipped because the limit is ${maxFiles}.`,
          { type: "warning" },
        );
      }
      if (!onUpload || readOnly || incoming.length === 0) {
        return;
      }

      itemsRef.current = [
        ...(multiple ? itemsRef.current : []),
        ...incoming.map((file) => ({ file, status: "uploading" as const })),
      ];
      writeValue();

      const result = new Map<File, Item>(
        await Promise.all(
          incoming.map((file) =>
            onUpload(file)
              .then(
                (metadata) =>
                  [
                    file,
                    {
                      file,
                      metadata,
                      status: "complete",
                    },
                  ] as const,
              )
              .catch(
                () =>
                  [
                    file,
                    {
                      file,
                      status: "error",
                    },
                  ] as const,
              ),
          ),
        ),
      );
      itemsRef.current = itemsRef.current.map(
        (item) => result.get(item.file) ?? item,
      );
      writeValue();
    },
    [maxFiles, multiple, onUpload, readOnly, writeValue],
  );

  const handleRemove = useCallback(
    (item: Item) => {
      itemsRef.current = itemsRef.current.filter((i) => i !== item);
      writeValue();
    },
    [writeValue],
  );

  return (
    <FileUpload
      accept={accept}
      disabled={!onUpload || readOnly || atMax}
      onFilesDrop={handleFilesDrop}
    >
      <VisuallyHidden asChild>
        <input
          aria-hidden
          defaultValue={0}
          max={maxFiles !== undefined ? String(maxFiles) : undefined}
          min={String(minFiles)}
          name={name}
          ref={inputRef}
          tabIndex={-1}
          type="number"
        />
      </VisuallyHidden>
      {items.length > 0 ? (
        <Flex flexDirection="column" gap="8">
          {multiple && !atMax && (
            <FileUploadTrigger alignSelf="end" icon={<IconPlus />}>
              Add File
            </FileUploadTrigger>
          )}
          <FileUploadList items={items} onRemove={handleRemove} />
          {!atMax && <FileUploadDropzone overlay />}
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
