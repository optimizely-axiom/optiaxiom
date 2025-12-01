import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import pkg from "../package.json";
import {
  getAllComponents,
  getComponent,
  getGuide,
  getTokens,
} from "./loaders.js";
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
      "🚨 CRITICAL: ALWAYS read component info to get actual defaults and behavior - DO NOT assume based on standard HTML/CSS!\n\n" +
      "⚠️ VALIDATION REQUIRED WHEN USING EXTERNAL CODE: If component names came from Figma, screenshots, or other external sources, validate them with search_components() FIRST. " +
      "External tools generate invalid names (BreadcrumbItem, TabsTab don't exist in Axiom).\n\n" +
      "⚠️ SPECIAL ATTENTION FOR FLEX LAYOUTS:\n" +
      "- Flex defaults to flexDirection='column' (VERTICAL), NOT 'row' like standard CSS\n" +
      "- Flex defaults to alignItems='stretch' in column layouts, 'center' in row layouts\n" +
      "- For form layouts with Input/Button/Textarea: use alignItems='start' to prevent inputs from stretching to full width\n" +
      '- Example: <Flex alignItems="start"><Input /><Button /></Flex>\n\n' +
      "---\n\n" +
      "Get detailed information about a specific Axiom component including props, examples, and usage guidelines. " +
      "Pay special attention to the component description and prop defaults, as Axiom components may have different defaults than standard HTML/CSS. " +
      "NOTE: All Axiom components are installed via the same npm package: npm install @optiaxiom/react",
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
      "⚠️ VALIDATION TIP: Use this list to verify component names from Figma/external sources. " +
      "If a name doesn't appear here, it doesn't exist in Axiom.\n\n" +
      "⚠️ IMPORTANT LAYOUT DEFAULTS:\n" +
      "- Flex defaults to flexDirection='column' and alignItems='stretch'\n" +
      '- For forms with Input/Button: use <Flex alignItems="start"> to prevent stretching\n\n' +
      "---\n\n" +
      "List all available Axiom components with their descriptions. " +
      "Use this to discover what components are available. " +
      "IMPORTANT: After selecting a component, ALWAYS use get_component() to read its full documentation - DO NOT assume behavior based on standard HTML/CSS. " +
      "NOTE: All Axiom components are installed via the same npm package: npm install @optiaxiom/react",
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
      "🔍 USE THIS FIRST FOR VALIDATION: When working with Figma/external code, ALWAYS call this tool to validate component names before use. " +
      "Returns count: 0 if component doesn't exist.\n\n" +
      "Common invalid names from Figma:\n" +
      "- BreadcrumbItem, BreadcrumbLink → Use Breadcrumb with items prop\n" +
      "- TabsTab → Use TabsTrigger\n\n" +
      "⚠️ LAYOUT COMPONENT DEFAULTS:\n" +
      "- Flex defaults to flexDirection='column' and alignItems='stretch'\n" +
      '- For forms with Input/Button: use <Flex alignItems="start"> to prevent stretching\n\n' +
      "---\n\n" +
      "Search Axiom components by name, description, or keywords. " +
      "Returns a list of matching components. " +
      "After finding a component, ALWAYS use get_component() to read full details - DO NOT assume defaults based on standard HTML/CSS behavior. " +
      "NOTE: All Axiom components are installed via the same npm package: npm install @optiaxiom/react",
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
      "⚠️ EXTERNAL CODE TIP: Use this to convert Figma's hardcoded values (hex colors, px sizes) to Axiom's semantic tokens (bg.*, fg.*, h='md').\n\n" +
      "---\n\n" +
      "Get design token mappings for the Axiom Design System. " +
      "Returns token-to-value mappings for: colors (hex values for light mode), sizes (px/rem for width/height), spacing (px/rem for margin/padding/gap), borderRadius, fontSize (with lineHeight), boxShadow, duration, fontFamily, and zIndex. " +
      "Use this to convert Figma design values to semantic tokens (e.g., #4F576E → fg.secondary, 32px height → h='md'). " +
      "NOTE: All Axiom components are installed via the same npm package: npm install @optiaxiom/react",
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

// Register guide resources
server.registerResource(
  "guide",
  new ResourceTemplate("axiom://guide/{name}", { list: undefined }),
  {
    description: "Setup and configuration guides for Axiom Design System",
    mimeType: "text/markdown",
    title: "Guide: {name}",
  },
  async (uri, variables) => {
    const name = variables.name as string;
    const guide = getGuide(name);

    if (!guide) {
      throw new Error(`Guide not found: ${name}`);
    }

    return {
      contents: [
        {
          mimeType: "text/markdown",
          text: guide.content,
          uri: uri.href,
        },
      ],
    };
  },
);
