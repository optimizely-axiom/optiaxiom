import type { Meta, StoryObj } from "@storybook/react";

import {
  Box,
  FileUpload,
  FileUploadContext,
  FileUploadDropzone,
  FileUploadLabel,
  Flex,
} from "@optiaxiom/react";

const meta: Meta<typeof FileUpload> = {
  component: FileUpload,
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

export const Primary: Story = {
  render: () => {
    return (
      <FileUpload maxFiles={5}>
        <FileUploadLabel>
          <p>File Upload</p>
        </FileUploadLabel>
        <Box asChild border="2" h="full" w="full">
          <FileUploadDropzone>Drag your files here</FileUploadDropzone>
        </Box>
        <FileUploadContext>
          {({ acceptedFiles, rejectedFiles }) => {
            return (
              <Flex flexDirection="column">
                <Box>
                  <p> Accepted Files </p>
                  {acceptedFiles.map((file) => (
                    <p key={file.name}> {file.name}</p>
                  ))}
                </Box>
                <Box>
                  <p> Rejected Files </p>
                  {rejectedFiles.map((fileRejection) => (
                    <p key={fileRejection.file.name}>
                      {" "}
                      {fileRejection.file.name}
                    </p>
                  ))}
                </Box>
              </Flex>
            );
          }}
        </FileUploadContext>
      </FileUpload>
    );
  },
};
