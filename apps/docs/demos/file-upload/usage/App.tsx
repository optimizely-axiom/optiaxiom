"use client";

import { toaster } from "@optiaxiom/react";
import { FileUpload, FileUploadDropzone } from "@optiaxiom/react/unstable";

export function App() {
  return (
    <FileUpload
      accept={{ "image/*": [] }}
      onFilesDrop={(files) => {
        toaster.create(`${files.length} files added!`);
      }}
      w="384"
    >
      <FileUploadDropzone description="SVG, PNG, JPG or GIF (max. 2MB)" />
    </FileUpload>
  );
}
