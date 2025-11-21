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

// Export for programmatic use
export { AxiomMCPServer } from './server/mcp-server.js';
export * from './types/index.js';
export * from './services/index.js';
