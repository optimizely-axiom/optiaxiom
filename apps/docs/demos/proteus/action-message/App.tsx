"use client";

import { IconArrowUp, IconPlus } from "@optiaxiom/icons";
import {
  ProteusDocumentRenderer,
  type StructuredMessage,
} from "@optiaxiom/proteus";
import { Box, Button, Flex, Paper, Spinner, Text } from "@optiaxiom/react";
import { useRef, useState } from "react";

type Message = {
  content: string;
  role: "assistant" | "user";
};

// The message actions in the document send these strings back to the LLM. Each
// preset user message maps to a canned assistant reply so the mock chat can
// respond without a real backend.
const replies: Record<string, string> = {
  "I'd like to leave a comment on this task.":
    "Sure — what would you like the comment to say? I'll post it to TSK-98 once you confirm.",
  "Show me the full details for TSK-98.":
    "TSK-98 tracks the 12% retention drop after v2.2. Root cause is a slower cold-start on Android; a fix is in review, targeted for v2.2.1.",
};

const messageToText = (message: string | StructuredMessage) =>
  typeof message === "string"
    ? message
    : message.parts.map((part) => part.content).join("");

export function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [pending, setPending] = useState(false);
  const threadRef = useRef<HTMLDivElement | null>(null);

  const onMessage = (message: string | StructuredMessage) => {
    const text = messageToText(message);
    setMessages((prev) => [...prev, { content: text, role: "user" }]);
    setPending(true);
    // A real app would stream the reply from the LLM here — we resolve a preset
    // response after a short delay to mimic the round-trip.
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          content:
            replies[text] ??
            "Got it — I'll take a look and get back to you shortly.",
          role: "assistant",
        },
      ]);
      setPending(false);
      threadRef.current?.scrollTo({
        behavior: "smooth",
        top: threadRef.current.scrollHeight,
      });
    }, 600);
  };

  return (
    <Box
      bg="bg.default"
      border="1"
      borderColor="border.secondary"
      display="flex"
      flexDirection="column"
      maxW="md"
      overflow="hidden"
      rounded="lg"
      w="full"
    >
      <Box
        bg="bg.secondary"
        borderB="1"
        borderColor="border.secondary"
        display="flex"
        flexDirection="column"
        p="16"
      >
        <Text fontWeight="600">New Chat</Text>
        <Text color="fg.secondary" fontSize="sm">
          How can I help you today?
        </Text>
      </Box>

      <Flex gap="16" maxH="lg" overflow="auto" p="16" ref={threadRef}>
        {/* The document is the assistant's opening message — the message actions
            it declares push preset user messages into the thread below. */}
        <ProteusDocumentRenderer
          collapsible={false}
          element={{
            $type: "Document",
            actions: [
              {
                $type: "Action",
                children: "Comment",
                onClick: {
                  message: "I'd like to leave a comment on this task.",
                },
              },
              {
                $type: "Action",
                appearance: "primary",
                children: "View task",
                onClick: {
                  message: "Show me the full details for TSK-98.",
                },
              },
            ],
            appName: "Content Marketing Platform",
            body: [
              {
                $type: "Text",
                children:
                  "Initial performance metrics reveal a 12% drop in user retention post-update.",
              },
            ],
            subtitle: "Android Scrum Campaign / TSK-98",
            title: "Version 2.2 Performance Optimization",
          }}
          onMessage={onMessage}
        />

        {messages.map((message, index) =>
          message.role === "user" ? (
            <Paper
              alignSelf="end"
              bg="bg.accent.subtle"
              key={index}
              px="16"
              py="8"
              w="3/4"
            >
              <Text fontSize="sm">{message.content}</Text>
            </Paper>
          ) : (
            <Text alignSelf="start" fontSize="sm" key={index} w="3/4">
              {message.content}
            </Text>
          ),
        )}

        {pending && (
          <Flex alignSelf="start" flexDirection="row" gap="8">
            <Spinner size="sm" />
            <Text color="fg.tertiary" fontSize="sm">
              Thinking…
            </Text>
          </Flex>
        )}
      </Flex>

      {/* Prompt is disabled — this demo only sends the document's preset
          messages, so there's nothing to type. */}
      <Flex
        borderColor="border.secondary"
        borderT="1"
        flexDirection="row"
        gap="8"
        p="12"
      >
        <Button aria-label="Add attachment" disabled icon={<IconPlus />} />
        <Box
          alignItems="center"
          color="fg.tertiary"
          display="flex"
          flex="1"
          fontSize="sm"
        >
          Press an action above to send a message
        </Box>
        <Button
          appearance="primary"
          aria-label="Send message"
          disabled
          icon={<IconArrowUp />}
        />
      </Flex>
    </Box>
  );
}
