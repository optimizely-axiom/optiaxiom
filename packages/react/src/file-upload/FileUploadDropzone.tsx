import { useFileUploadContext } from "./FileUpload";

export const FileUploadDropzone: React.FC = () => {
  const { getInputProps, getRootProps } = useFileUploadContext();

  return (
    <div {...getRootProps()}>
      <input type="file" {...(getInputProps() as React.InputHTMLAttributes<HTMLInputElement>)} />
      <div>Drag and drop or click to upload</div>
    </div>
  );
};

FileUploadDropzone.displayName = '@optiaxiom/react/FileUploadDropzone';