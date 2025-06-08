import type { Meta, StoryObj } from '@storybook/react'

import { FileUploadDropzone } from '@optiaxiom/react'

export default {
  argTypes: {
    onFilesDrop: { action: 'files dropped' },
  },
  component: FileUploadDropzone,
  parameters: {
    layout: 'centered',
  },
  title: 'Components/FileUploadDropzone',
} as Meta<typeof FileUploadDropzone>

type Story = StoryObj<typeof FileUploadDropzone>

export const Basic: Story = {
  args: {},
} 