import { describe, expect, it, vi } from "vitest";

const { StdioServerTransport } = vi.hoisted(() => ({
  StdioServerTransport: vi.fn(),
}));

vi.mock("@modelcontextprotocol/sdk/server/stdio.js", () => ({
  StdioServerTransport,
}));

describe("package entry", () => {
  it("can be imported by a host without taking over stdio", async () => {
    const entry = await import("./index.js");

    expect(StdioServerTransport).not.toHaveBeenCalled();
    expect(entry.createServer).toBeTypeOf("function");
  });
});
