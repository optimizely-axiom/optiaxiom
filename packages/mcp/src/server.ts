import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import pkg from "../package.json" with { type: "json" };
import { getAllComponents, getComponent, getTokens } from "./loaders.js";
import { createArrayResponse, createResponse } from "./responses.js";
import { searchComponents } from "./search.js";

function jsonify(data: unknown): string {
  return JSON.stringify(data, null, 2);
}

/**
 * Axiom Design System MCP Server
 */
export const server = new McpServer({
  name: pkg.name,
  version: pkg.version,
});

// Tool: get_component
server.registerTool(
  "get_component",
  {
    description:
      "Get detailed information about a specific Axiom component including props, examples, and usage guidelines. NOTE: All Axiom components are installed via the same npm package: npm install @optiaxiom/react",
    inputSchema: {
      name: z
        .string()
        .describe('Component name (e.g., "Badge", "Button", "Alert")'),
    },
    title: "Get Component",
  },
  async ({ name }) => {
    const component = getComponent(name);

    if (!component) {
      return {
        content: [
          {
            text: `Component "${name}" not found in Axiom Design System.\n\nUse the search_components tool to find available components.`,
            type: "text" as const,
          },
        ],
      };
    }

    return {
      content: [
        {
          text: jsonify(createResponse(component)),
          type: "text" as const,
        },
      ],
    };
  },
);

// Tool: list_components
server.registerTool(
  "list_components",
  {
    description:
      "List all available Axiom components with their descriptions. Use this to discover what components are available. Use get_component or search_components to get more details. NOTE: All Axiom components are installed via the same npm package: npm install @optiaxiom/react",
    inputSchema: {},
    title: "List Components",
  },
  async () => {
    // Only return primary components (those without a group, or those where name === group)
    const data = getAllComponents()
      .filter((c) => !c.group || c.name === c.group)
      .map((component) => ({
        description: component.description,
        name: component.name,
      }));

    return {
      content: [
        {
          text: jsonify(createArrayResponse(data)),
          type: "text" as const,
        },
      ],
    };
  },
);

// Tool: search_components
server.registerTool(
  "search_components",
  {
    description:
      "Search Axiom components by name, description, or keywords. Returns a list of matching components. NOTE: All Axiom components are installed via the same npm package: npm install @optiaxiom/react",
    inputSchema: {
      limit: z
        .number()
        .optional()
        .default(10)
        .describe("Maximum results to return (default: 10)"),
      query: z
        .string()
        .describe("Search query (component name, keyword, or description)"),
    },
    title: "Search Components",
  },
  async ({ limit, query }) => {
    const data = searchComponents({
      components: getAllComponents(),
      limit,
      query,
    }).map((result) => ({
      description: result.description,
      import: result.import,
      name: result.name,
    }));

    return {
      content: [
        {
          text: jsonify(createArrayResponse(data, { query })),
          type: "text" as const,
        },
      ],
    };
  },
);

// Tool: get_tokens
server.registerTool(
  "get_tokens",
  {
    description:
      "Get design token mappings for the Axiom Design System. Returns token-to-value mappings for: colors (hex values for light mode), sizes (px/rem for width/height), spacing (px/rem for margin/padding/gap), borderRadius, fontSize (with lineHeight), boxShadow, duration, fontFamily, and zIndex. Use this to convert Figma design values to semantic tokens (e.g., #4F576E → fg.secondary, 32px height → h='md'). NOTE: All Axiom components are installed via the same npm package: npm install @optiaxiom/react",
    inputSchema: {},
    title: "Get Design Tokens",
  },
  async () => {
    const tokens = getTokens();

    return {
      content: [
        {
          text: jsonify(createResponse(tokens)),
          type: "text" as const,
        },
      ],
    };
  },
);

// Register component resources
server.registerResource(
  "component",
  new ResourceTemplate("axiom://component/{name}", { list: undefined }),
  {
    description: "Metadata for Axiom component",
    mimeType: "application/json",
    title: "Component: {name}",
  },
  async (uri, variables) => {
    const name = variables.name as string;
    const component = getComponent(name);

    if (!component) {
      throw new Error(`Component not found: ${name}`);
    }

    return {
      contents: [
        {
          mimeType: "application/json",
          text: jsonify(createResponse(component)),
          uri: uri.href,
        },
      ],
    };
  },
);
