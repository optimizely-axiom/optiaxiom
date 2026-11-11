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

async function getPatterns(args: Record<string, unknown>) {
  const client = await connect(createServer());
  const result = await client.callTool({
    arguments: args,
    name: "get_patterns",
  });
  await client.close();
  return JSON.parse(
    (result.content as Array<{ text: string }>)[0].text,
  ) as Array<{
    code: Array<{ content: string; filename: string }>;
    title: string;
  }>;
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

  it("returns the breakpoint widths behind responsive props", async () => {
    const client = await connect(createServer());

    const result = await client.callTool({
      arguments: { categories: ["breakpoints"] },
      name: "get_tokens",
    });

    expect(
      JSON.parse((result.content as Array<{ text: string }>)[0].text),
    ).toEqual({ breakpoints: { sm: "600px", md: "900px" } });

    await client.close();
  });

  it("explains the prop definition format only alongside prop definitions", async () => {
    const client = await connect(createServer());

    const [names, definitions] = await Promise.all(
      [{ name: "Box" }, { name: "Box", props: "padding" }].map(async (args) =>
        JSON.parse(
          (
            (await client.callTool({ arguments: args, name: "get_component" }))
              .content as Array<{ text: string }>
          )[0].text,
        ),
      ),
    );

    expect(names).not.toHaveProperty("note");
    expect(definitions.note).toContain("responsive: true");

    await client.close();
  });

  it("lists required props among the requested prop definitions", async () => {
    const client = await connect(createServer());

    const result = await client.callTool({
      arguments: { name: "Select", props: "options" },
      name: "get_component",
    });
    const { props, required } = JSON.parse(
      (result.content as Array<{ text: string }>)[0].text,
    );

    expect(props.options).toMatchObject({
      items: { title: "SelectOption", type: "object" },
      type: "array",
    });
    expect(required).toEqual(["options"]);

    await client.close();
  });

  it("lists every required prop even when the props query doesn't match it", async () => {
    const client = await connect(createServer());

    const result = await client.callTool({
      arguments: { name: "Select", props: "disabled" },
      name: "get_component",
    });
    const { props, required } = JSON.parse(
      (result.content as Array<{ text: string }>)[0].text,
    );

    expect(props).not.toHaveProperty("options");
    expect(required).toEqual(["options"]);

    await client.close();
  });

  it("returns prop names and every required prop without a props query", async () => {
    const client = await connect(createServer());

    const result = await client.callTool({
      arguments: { name: "Select" },
      name: "get_component",
    });
    const { props, required } = JSON.parse(
      (result.content as Array<{ text: string }>)[0].text,
    );

    expect(props).toContain("options");
    expect(required).toEqual(["options"]);

    await client.close();
  });

  it("omits required when a component has no required props", async () => {
    const client = await connect(createServer());

    const result = await client.callTool({
      arguments: { name: "Button" },
      name: "get_component",
    });
    const { required } = JSON.parse(
      (result.content as Array<{ text: string }>)[0].text,
    );

    expect(required).toBeUndefined();

    await client.close();
  });
});

describe("get_patterns", () => {
  it("leads with an example using every requested component", async () => {
    const [first] = await getPatterns({ components: "Menu LabelMenuButton" });

    for (const tag of [/<Menu[\s>]/, /<LabelMenuButton[\s/>]/]) {
      expect(first.code.some(({ content }) => tag.test(content))).toBe(true);
    }
  });

  it("keeps each requested component's usage example", async () => {
    const results = await getPatterns({ components: "Field Input Button" });

    expect(results.map(({ title }) => title)).toEqual(
      expect.arrayContaining(["Field/usage", "Input/usage", "Button/usage"]),
    );
  });

  it("finds a component's own examples even when they don't import it", async () => {
    const results = await getPatterns({
      components: "AlertDialog",
      query: "managed",
    });

    expect(results.map(({ title }) => title)).toEqual(
      expect.arrayContaining(["AlertDialog/managed-usage"]),
    );
  });

  it("puts a component's own usage example first", async () => {
    const results = await getPatterns({ components: "Select" });

    expect(results[0].title).toBe("Select/usage");
  });

  it("returns only examples matching the query", async () => {
    const results = await getPatterns({ components: "Input", query: "addon" });

    expect(results.length).toBeGreaterThan(0);
    for (const { title } of results) {
      expect(title).toMatch(/^Input\/.*addon/);
    }
  });
});
