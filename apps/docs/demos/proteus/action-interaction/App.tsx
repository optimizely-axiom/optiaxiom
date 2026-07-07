"use client";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  // The interaction handler owns the card's state. Each named interaction maps
  // to a data update, and the document re-renders off that data via `Show` and
  // `Value` — so clicking a button meaningfully changes what the card shows.
  const [data, setData] = useState<Record<string, unknown>>({ status: "" });

  return (
    <Box maxW="md" w="full">
      <ProteusDocumentRenderer
        data={data}
        element={{
          $type: "Document",
          // While the task is pending we show Approve / Request changes; once
          // resolved (via `else`) we swap in a single Reopen action that clears
          // the status and returns the card to its pending state.
          actions: {
            $type: "Show",
            children: [
              {
                $type: "Action",
                appearance: "danger",
                children: "Request changes",
                onClick: { interaction: "request_changes" },
              },
              {
                $type: "Action",
                appearance: "primary",
                children: "Approve",
                onClick: { interaction: "approve" },
              },
            ],
            else: {
              $type: "Action",
              appearance: "subtle",
              children: "Reopen",
              onClick: { interaction: "reopen" },
            },
            when: { "!": { $type: "Value", path: "/status" } },
          },
          appName: "Content Marketing Platform",
          body: [
            {
              $type: "Text",
              children:
                "Initial performance metrics reveal a 12% drop in user retention post-update.",
            },
            {
              $type: "Show",
              children: {
                $type: "Alert",
                children: "Approved — the task has been moved to Done.",
                intent: "success",
              },
              when: { "==": [{ $type: "Value", path: "/status" }, "approved"] },
            },
            {
              $type: "Show",
              children: {
                $type: "Alert",
                children: "Changes requested — sent back to the assignee.",
                intent: "danger",
              },
              when: {
                "==": [{ $type: "Value", path: "/status" }, "changes"],
              },
            },
          ],
          subtitle: "Android Scrum Campaign / TSK-98",
          title: "Version 2.2 Performance Optimization",
        }}
        onInteraction={(name) => {
          if (name === "approve") {
            setData({ status: "approved" });
          } else if (name === "request_changes") {
            setData({ status: "changes" });
          } else if (name === "reopen") {
            setData({ status: "" });
          }
        }}
      />
    </Box>
  );
}
