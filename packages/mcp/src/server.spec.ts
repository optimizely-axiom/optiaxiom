import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { describe, expect, it } from "vitest";

import { createServer } from "./server.js";

async function connect(server: ReturnType<typeof createServer>) {
  const [clientTransport, serverTransport] =
    InMemoryTransport.createLinkedPair();
  await server.connect(serverTransport);
  const client = new Client({ name: "test", version: "0" });
  await client.connect(clientTransport);
  return client;
}

describe("createServer", () => {
  it("lets a host connect one server per request concurrently", async () => {
    const a = createServer();
    const b = createServer();
    expect(a).not.toBe(b);

    const [clientA, clientB] = await Promise.all([connect(a), connect(b)]);
    const [toolsA, toolsB] = await Promise.all([
      clientA.listTools(),
      clientB.listTools(),
    ]);

    expect(toolsA.tools.map((tool) => tool.name)).toEqual([
      "get_component",
      "search_components",
      "get_patterns",
      "get_tests",
      "get_tokens",
      "search_icons",
      "get_guides",
    ]);
    expect(toolsB).toEqual(toolsA);

    await Promise.all([clientA.close(), clientB.close()]);
  });
});
