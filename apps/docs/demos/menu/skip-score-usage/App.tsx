"use client";

import { Box, Menu, MenuContent, MenuTrigger } from "@optiaxiom/react";

export function App({
  skipFilterScoring = true,
}: {
  skipFilterScoring: boolean;
}) {
  return (
    <Menu
      options={[
        {
          addon: <Box>1.</Box>,
          label: "Launch campaign",
          skipFilterScoring,
        },
        {
          addon: <Box pr="16">1.a</Box>,
          label: "2025 Launch",
          skipFilterScoring,
        },
        {
          addon: <Box>2.</Box>,
          label: "Product launch sandbox",
          skipFilterScoring,
        },
        {
          addon: <Box pr="16">2.a</Box>,
          label: "Launch 2025 sandbox",
          skipFilterScoring,
        },
      ]}
    >
      <MenuTrigger>Campaigns</MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
