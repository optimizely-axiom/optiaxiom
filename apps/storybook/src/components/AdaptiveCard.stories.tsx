import type { Meta, StoryObj } from "@storybook/react-vite";

import { AdaptiveCard } from "@optiaxiom/react/unstable";

export default {
  component: AdaptiveCard,
  parameters: {
    layout: "padded",
  },
} as Meta<typeof AdaptiveCard>;

type Story = StoryObj<typeof AdaptiveCard>;

export const Basic: Story = {
  args: {
    card: {
      body: [
        {
          text: "This is a basic Adaptive Card that demonstrates rendering elements from JSON.",
          type: "TextBlock",
        },
      ],
      type: "AdaptiveCard",
      version: "1.5",
    },
  },
};

export const FormInputs: Story = {
  args: {
    card: {
      body: [
        {
          id: "name",
          isRequired: true,
          label: "Name",
          placeholder: "Enter your name",
          type: "Input.Text",
        },
        {
          id: "age",
          label: "Age",
          max: 120,
          min: 18,
          placeholder: "Enter your age",
          type: "Input.Number",
        },
        {
          id: "visit_date",
          label: "Visit date",
          type: "Input.Date",
        },
        {
          choices: [
            { title: "Excellent", value: "excellent" },
            { title: "Good", value: "good" },
            { title: "Average", value: "average" },
            { title: "Poor", value: "poor" },
          ],
          id: "rating",
          isRequired: true,
          label: "How would you rate your experience?",
          type: "Input.RadioGroup",
        },
        {
          choices: [
            { title: "Service quality", value: "service" },
            { title: "Cleanliness", value: "cleanliness" },
            { title: "Wait time", value: "wait_time" },
            { title: "Pricing", value: "pricing" },
          ],
          id: "interests",
          label: "Areas for improvement (select all that apply)",
          type: "Input.Checkbox",
        },
        {
          id: "subscribe",
          title: "Subscribe to updates",
          type: "Input.Toggle",
        },
      ],
      type: "AdaptiveCard",
      version: "1.5",
    },
  },
};

export const Containers: Story = {
  args: {
    card: {
      body: [
        {
          items: [
            {
              text: "All services are operational",
              type: "TextBlock",
            },
          ],
          style: "success",
          type: "Container",
        },
        {
          items: [
            {
              text: "Scheduled maintenance on December 20th",
              type: "TextBlock",
            },
          ],
          style: "warning",
          type: "Container",
        },
        {
          items: [
            {
              text: "Database migration required by end of month",
              type: "TextBlock",
            },
          ],
          style: "danger",
          type: "Container",
        },
        {
          items: [
            {
              text: "New features available in the latest update",
              type: "TextBlock",
            },
          ],
          style: "information",
          type: "Container",
        },
        {
          items: [
            {
              text: "Regular system status check completed",
              type: "TextBlock",
            },
          ],
          style: "neutral",
          type: "Container",
        },
      ],
      type: "AdaptiveCard",
      version: "1.5",
    },
  },
};

export const FactSets: Story = {
  args: {
    card: {
      body: [
        {
          text: "Sarah Johnson",
          type: "TextBlock",
          weight: "bolder",
        },
        {
          facts: [
            { title: "Role", value: "Senior Product Manager" },
            { title: "Department", value: "Product" },
            { title: "Location", value: "San Francisco, CA" },
            { title: "Join Date", value: "January 2022" },
            { title: "Email", value: "sarah.johnson@example.com" },
          ],
          type: "FactSet",
        },
      ],
      type: "AdaptiveCard",
      version: "1.5",
    },
  },
};

export const WithImages: Story = {
  args: {
    card: {
      body: [
        {
          altText: "Product banner",
          size: "small",
          type: "Image",
          url: "https://placehold.co/600x400",
        },
        {
          text: "Product Launch Announcement",
          type: "TextBlock",
          weight: "bolder",
        },
        {
          text: "We're excited to announce our new product! Available starting next quarter.",
          type: "TextBlock",
        },
      ],
      type: "AdaptiveCard",
      version: "1.5",
    },
  },
};
