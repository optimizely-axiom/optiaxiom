#!/usr/bin/env node

import { AxiomMCPServer } from './server/mcp-server.js';

async function main() {
  const server = new AxiomMCPServer();
  await server.start();
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
