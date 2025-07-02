import { forwardRef, useState } from "react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { IconAngleLeft } from "../icons/IconAngleLeft";
import { IconAngleRight } from "../icons/IconAngleRight";
import { SegmentedControl, SegmentedControlItem } from "../segmented-control";
import { FileList } from "./FileList";
import { FileUploadProvider } from "./FileUploadContext";

export type FileUploadProps = BoxProps<
  "div",
  {
    /**
     * File types to accept for upload. An object with the keys set to the MIME
     * type and the values an array of file extensions.
     *
     * @example
     * {
     *   "image/*": [],
     * }
     */
    accept?: DropzoneOptions["accept"];
    /**
     * Callback function called when files are dropped or selected
     */
    onFilesDrop?: (files: File[]) => void;
    /**
     * The view to use for the file preview list.
     *
     * @default "list"
     */
    view?: "grid" | "list";
  }
>;

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  ({ accept, children, onFilesDrop, view: viewProp, ...props }, ref) => {
    const [files, setFiles] = useState<File[]>([]);
    const [view, setView] = useState<"grid" | "list">(viewProp || "list");
    const {
      getInputProps,
      getRootProps,
      isDragAccept,
      isDragActive,
      isDragReject,
    } = useDropzone({
      accept,
      onDrop: (acceptedFiles) => {
        if (acceptedFiles.length) {
          setFiles((prev) => [...prev, ...acceptedFiles]);
          onFilesDrop?.(acceptedFiles);
        }
      },
    });

    return (
      <FileUploadProvider
        files={files}
        getInputProps={getInputProps}
        getRootProps={getRootProps}
        isDragAccept={isDragActive && isDragAccept}
        isDragReject={isDragActive && isDragReject}
        setFiles={setFiles}
        setView={setView}
        view={view}
      >
        <Box color="fg.default" ref={ref} {...props}>
          {files.length > 0 ? (
            <>
              <Flex alignItems="end" mb="8" mt="16">
                <SegmentedControl
                  onValueChange={(val: string) =>
                    setView(val as "grid" | "list")
                  }
                  type="single"
                  value={view}
                >
                  <SegmentedControlItem value="list">
                    <IconAngleLeft />
                  </SegmentedControlItem>
                  <SegmentedControlItem value="grid">
                    <IconAngleRight />
                  </SegmentedControlItem>
                </SegmentedControl>
              </Flex>

              <FileList files={files} />
            </>
          ) : (
            children
          )}
        </Box>
      </FileUploadProvider>
    );
  },
);

FileUpload.displayName = "@optiaxiom/react/FileUpload";
