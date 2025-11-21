#!/usr/bin/env node

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { server } from "./server.js";

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Axiom MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});

// Export for programmatic use
export { server } from "./server.js";
export * from "./types.js";
