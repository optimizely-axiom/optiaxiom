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
      <Flex
        alignItems="center"
        asChild
        bg="bg.brand.subtle"
        border="1"
        justifyContent="center"
        rounded="lg"
        w="320"
      >
        <FileUpload maxFiles={5}>
          <FileUploadLabel>
            <p>File Upload</p>
          </FileUploadLabel>
          <Flex
            alignItems="center"
            asChild
            border="1"
            h="320"
            justifyContent="center"
            rounded="lg"
            w="full"
          >
            <FileUploadDropzone>
              <Box border="1" p="10" rounded="sm">
                Drag your files here
              </Box>
            </FileUploadDropzone>
          </Flex>
          <FileUploadContext>
            {({ acceptedFiles, rejectedFiles }) => {
              return (
                <Flex alignItems="center" flexDirection="column">
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
      </Flex>
    );
  },
};
