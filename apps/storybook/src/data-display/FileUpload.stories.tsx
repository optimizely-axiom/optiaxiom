import type { Meta, StoryObj } from "@storybook/react";

import {
  Box,
  FileUpload,
  FileUploadContext,
  FileUploadDropzone,
  FileUploadLabel,
  FileUploadTrigger,
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
        border="1"
        justifyContent="center"
        rounded="lg"
        w="320"
      >
        <FileUpload maxFiles={5}>
          <FileUploadLabel>
            <>
              <h3>File Upload </h3>
              <h5>Maximum 5 Files</h5>
            </>
          </FileUploadLabel>
          <Flex
            alignItems="center"
            h="320"
            justifyContent="center"
            rounded="lg"
            w="full"
          >
            <Flex
              alignItems="center"
              asChild
              bg="bg.neutral"
              border="1"
              h="full"
              justifyContent="center"
              rounded="sm"
              w="full"
            >
              <FileUploadDropzone>Drag your files here</FileUploadDropzone>
            </Flex>
            <FileUploadTrigger>
              <Box>Click to Upload</Box>
            </FileUploadTrigger>
          </Flex>
          <FileUploadContext>
            {({ acceptedFiles, rejectedFiles }) => {
              return (
                <Flex
                  alignItems="start"
                  flexDirection="column"
                  justifyContent="start"
                >
                  <Box flex="1">
                    <h4> Accepted Files </h4>
                    <ul>
                      {acceptedFiles.map((file) => (
                        <li key={file.name}> {file.name}</li>
                      ))}
                    </ul>
                  </Box>
                  <Box flex="1">
                    <h4> Rejected Files </h4>
                    <ul>
                      {rejectedFiles.map((fileRejection) => (
                        <li key={fileRejection.file.name}>
                          {fileRejection.file.name}
                        </li>
                      ))}
                    </ul>
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
