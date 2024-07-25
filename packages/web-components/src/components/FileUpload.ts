import { FileUpload as FileUploadComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const FileUpload = "ax-file-uploader";
register(FileUpload, FileUploadComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [FileUpload]: ComponentAttributes<typeof FileUploadComponent>;
    }
  }
}
