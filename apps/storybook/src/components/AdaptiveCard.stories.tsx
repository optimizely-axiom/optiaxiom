import type { Meta, StoryObj } from "@storybook/react-vite";

import { Box, Heading } from "@optiaxiom/react";
import { AdaptiveCard } from "@optiaxiom/react/unstable";
import { useState } from "react";
import { action } from "storybook/actions";

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
      actions: [
        {
          data: { action: "acknowledge" },
          title: "Got it",
          type: "Action.Submit",
        },
      ],
      body: [
        {
          text: "This is a basic Adaptive Card that demonstrates the header, body, and actions structure.",
          type: "TextBlock",
        },
      ],
      header: {
        description: "Rendered using Axiom components",
        title: "Welcome to Adaptive Cards",
      },
      type: "AdaptiveCard",
      version: "1.5",
    },
    onAction: action("onAction"),
  },
};

export const ApprovalWorkflow: Story = {
  args: {
    card: {
      actions: [
        {
          data: { action: "approve" },
          title: "Approve",
          type: "Action.Submit",
        },
        {
          data: { action: "reject" },
          title: "Reject",
          type: "Action.Submit",
        },
      ],
      body: [
        {
          text: "The marketing team is requesting approval for the Q1 2026 budget.",
          type: "TextBlock",
        },
        {
          facts: [
            { title: "Requested Amount", value: "$250,000" },
            { title: "Department", value: "Marketing" },
            { title: "Quarter", value: "Q1 2026" },
            { title: "Submitted By", value: "Sarah Johnson" },
          ],
          type: "FactSet",
        },
        {
          id: "comments",
          isMultiline: true,
          label: "Comments",
          placeholder: "Add your feedback...",
          type: "Input.Text",
        },
        {
          id: "notify_team",
          title: "Notify team members of decision",
          type: "Input.Toggle",
        },
      ],
      header: {
        description: "Q1 2026 Marketing Budget",
        title: "Budget Approval Request",
      },
      type: "AdaptiveCard",
      version: "1.5",
    },
    onAction: action("onAction"),
  },
};

export const FormInputs: Story = {
  args: {
    card: {
      actions: [
        {
          data: { action: "submit" },
          title: "Submit Feedback",
          type: "Action.Submit",
        },
      ],
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
      header: {
        description: "Demonstrates all input types",
        title: "Feedback Form",
      },
      type: "AdaptiveCard",
      version: "1.5",
    },
    onAction: action("onAction"),
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
      header: {
        title: "System Status Update",
      },
      type: "AdaptiveCard",
      version: "1.5",
    },
    onAction: action("onAction"),
  },
};

export const FactSets: Story = {
  args: {
    card: {
      actions: [
        {
          title: "View Full Profile",
          type: "Action.OpenUrl",
          url: "https://example.com/profile",
        },
      ],
      body: [
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
      header: {
        description: "Sarah Johnson",
        title: "User Profile",
      },
      type: "AdaptiveCard",
      version: "1.5",
    },
    onAction: action("onAction"),
  },
};

export const WithImages: Story = {
  args: {
    card: {
      actions: [
        {
          title: "Learn More",
          type: "Action.OpenUrl",
          url: "https://example.com/product",
        },
      ],
      body: [
        {
          altText: "Product banner",
          size: "small",
          type: "Image",
          url: "https://placehold.co/600x400",
        },
        {
          text: "Available starting next quarter.",
          type: "TextBlock",
        },
      ],
      header: {
        description: "We're excited to announce our new product!",
        title: "Product Launch Announcement",
      },
      type: "AdaptiveCard",
      version: "1.5",
    },
    onAction: action("onAction"),
  },
};

export const Interactive: Story = {
  render: function Render() {
    const [lastAction, setLastAction] = useState<null | string>(null);

    const handleAction = (
      actionType: string,
      data?: Record<string, unknown>,
    ) => {
      setLastAction(`Action: ${actionType}, Data: ${JSON.stringify(data)}`);
      action("onAction")(actionType, data);
    };

    return (
      <Box>
        <AdaptiveCard
          card={{
            actions: [
              {
                data: { action: "send" },
                title: "Send",
                type: "Action.Submit",
              },
            ],
            body: [
              {
                id: "message",
                label: "Your message",
                placeholder: "Type something...",
                type: "Input.Text",
              },
              {
                id: "urgent",
                title: "Mark as urgent",
                type: "Input.Toggle",
              },
            ],
            header: {
              description: "Try the inputs and actions below",
              title: "Interactive Card",
            },
            type: "AdaptiveCard",
            version: "1.5",
          }}
          onAction={handleAction}
        />

        {lastAction && (
          <Box bg="bg.accent.subtle" mt="16" p="16" rounded="md">
            <Heading fontSize="sm" level="3" mb="8">
              Last Action:
            </Heading>
            <Box asChild fontFamily="mono" fontSize="sm">
              <pre>{lastAction}</pre>
            </Box>
          </Box>
        )}
      </Box>
    );
  },
};

export const MultipleActions: Story = {
  args: {
    card: {
      actions: [
        {
          data: { action: "complete" },
          title: "Complete",
          type: "Action.Submit",
        },
        {
          data: { action: "reassign" },
          title: "Reassign",
          type: "Action.Submit",
        },
        {
          title: "View Details",
          type: "Action.OpenUrl",
          url: "https://example.com/task",
        },
        {
          data: { action: "cancel" },
          title: "Cancel",
          type: "Action.Submit",
        },
      ],
      body: [],
      header: {
        description: "Please review the task and choose an action below",
        title: "Task Review",
      },
      type: "AdaptiveCard",
      version: "1.5",
    },
    onAction: action("onAction"),
  },
};

export const TeamsStyleCard: Story = {
  args: {
    card: {
      actions: [
        {
          title: "Join Meeting",
          type: "Action.OpenUrl",
          url: "https://teams.microsoft.com/meeting",
        },
        {
          data: { action: "snooze", duration: 5 },
          title: "Snooze",
          type: "Action.Submit",
        },
      ],
      body: [
        {
          facts: [
            { title: "Meeting", value: "Q1 Planning Review" },
            { title: "Time", value: "2:00 PM - 3:00 PM" },
            { title: "Location", value: "Conference Room A" },
            { title: "Organizer", value: "John Doe" },
          ],
          type: "FactSet",
        },
      ],
      header: {
        description: "You have an upcoming meeting in 15 minutes",
        title: "Meeting Reminder",
      },
      type: "AdaptiveCard",
      version: "1.5",
    },
    onAction: action("onAction"),
  },
};
