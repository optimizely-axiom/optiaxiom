import { FileUpload as ArkFileUpload } from "@ark-ui/react";

type FileUploadTriggerProps = ArkFileUpload.TriggerProps;
export const FileUploadTrigger = ({ children }: FileUploadTriggerProps) => {
  return (
    <>
      <ArkFileUpload.Trigger> {children}</ArkFileUpload.Trigger>
      <ArkFileUpload.HiddenInput />
    </>
  );
};
