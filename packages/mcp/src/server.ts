import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import pkg from "../package.json";
import {
  getAllComponents,
  getAllIcons,
  getComponent,
  getGuide,
  getTokens,
} from "./loaders.js";
import {
  searchComponents,
  searchExamples,
  searchIcons,
  searchProps,
} from "./search.js";

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
    description: `Get information about an Axiom component. Returns the component's description, import statement, and sub-components by default — no props.

Use the optional "props" parameter to search for specific props by name or description. Searches both component-specific props and style props — you don't need to know shorthand names, just describe what you want (e.g., "padding" finds the "p" prop).

Examples:
  get_component({ name: "Dialog" }) → description, import, sub-components
  get_component({ name: "Button", props: "appearance size" }) → + matching prop definitions
  get_component({ name: "Box", props: "padding background" }) → + p and bg prop definitions`,
    inputSchema: {
      name: z
        .string()
        .describe('Component name (e.g., "Badge", "Button", "Alert")'),
      props: z
        .string()
        .optional()
        .describe(
          "Search query to find specific props by name or description (e.g., 'appearance size', 'loading', 'padding background'). Omit to get just the component description, import, and sub-components without any props.",
        ),
    },
    title: "Get Component",
  },
  async ({ name, props: propsQuery }) => {
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
          text: JSON.stringify({
            components: component.components,
            deprecated: component.deprecated,
            description: component.description,
            examples: component.examples?.map((e) => e.title),
            import: component.import,
            name: component.name,
            props: propsQuery
              ? searchProps({
                  props: component.props,
                  query: propsQuery,
                })
              : Object.keys(component.props),
          }),
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
    description: `Search Axiom components by name, description, or keywords. Returns matching components. Use get_component() to read full details and get_patterns() to see composition examples.`,
    inputSchema: {
      category: z
        .string()
        .optional()
        .describe(
          "Filter by category (e.g., 'form', 'layout', 'navigation', 'feedback', 'overlay', 'data-display', 'actions', 'typography')",
        ),
      limit: z
        .number()
        .optional()
        .default(5)
        .describe("Maximum results to return (default: 5)"),
      query: z
        .string()
        .optional()
        .default("")
        .describe(
          "Search query (component name, keyword, or description). Leave empty to browse all components or all components in a category.",
        ),
    },
    title: "Search Components",
  },
  async ({ category, limit, query }) => {
    return {
      content: [
        {
          text: JSON.stringify(
            searchComponents({
              category,
              components: getAllComponents().filter(
                (c) => !c.group || c.name === c.group,
              ),
              limit,
              query,
            }).map((result) => ({
              description: result.description,
              import: result.import,
              name: result.name,
            })),
          ),
          type: "text" as const,
        },
      ],
    };
  },
);

// Tool: get_patterns
server.registerTool(
  "get_patterns",
  {
    description: `Find usage examples showing how Axiom components work together. Returns real working examples from the docs that demonstrate component composition patterns.

Examples:
  get_patterns({ components: "Field Input Button" }) → examples showing forms with fields and buttons
  get_patterns({ components: "Dialog" }) → examples showing full Dialog composition with sub-components
  get_patterns({ components: "Input", query: "addon" }) → examples showing Input with addons`,
    inputSchema: {
      components: z
        .string()
        .describe(
          'Space-separated component names to find patterns for (e.g., "Field Input Button"). Returns examples that use these components together.',
        ),
      limit: z
        .number()
        .min(1)
        .max(10)
        .optional()
        .default(5)
        .describe("Maximum number of examples to return (default: 5)."),
      query: z
        .string()
        .optional()
        .describe(
          "Search within example titles to find specific patterns (e.g., 'addon', 'form', 'disabled').",
        ),
    },
    title: "Get Patterns",
  },
  async ({ components, limit, query }) => {
    return {
      content: [
        {
          text: JSON.stringify(
            searchExamples({
              components,
              data: getAllComponents(),
              limit,
              query,
            }),
          ),
          type: "text" as const,
        },
      ],
    };
  },
);

// Tool: get_tokens
const tokenCategories = [
  "borderRadius",
  "boxShadow",
  "colors",
  "duration",
  "fontFamily",
  "fontSize",
  "maxSize",
  "size",
  "zIndex",
] as const;

server.registerTool(
  "get_tokens",
  {
    description: `Get design token mappings for the Axiom Design System. Returns token-to-value mappings for colors, sizes, spacing, borderRadius, fontSize, boxShadow, duration, fontFamily, and zIndex. Use this to convert hardcoded values to semantic tokens (e.g., #4F576E → fg.secondary, 32px height → h='md').`,
    inputSchema: {
      categories: z
        .array(z.enum(tokenCategories))
        .optional()
        .describe(
          "Filter to specific token categories (e.g., ['colors', 'boxShadow']). Returns all categories if omitted.",
        ),
    },
    title: "Get Design Tokens",
  },
  async ({ categories }) => {
    const tokens = getTokens();
    const result = categories
      ? Object.fromEntries(categories.map((cat) => [cat, tokens[cat]]))
      : tokens;

    return {
      content: [
        {
          text: JSON.stringify(result),
          type: "text" as const,
        },
      ],
    };
  },
);

// Tool: search_icons
server.registerTool(
  "search_icons",
  {
    description: `Search for icons from the @optimizely/axiom-icons package. Returns matching icon component names. Search by keywords (e.g., 'message', 'arrow', 'user').`,
    inputSchema: {
      limit: z
        .number()
        .optional()
        .default(10)
        .describe("Maximum results to return (default: 10)"),
      query: z
        .string()
        .describe(
          "Search query (icon keyword or name, e.g., 'message', 'arrow', 'user')",
        ),
    },
    title: "Search Icons",
  },
  async ({ limit, query }) => {
    return {
      content: [
        {
          text: JSON.stringify(
            searchIcons({
              icons: getAllIcons(),
              limit,
              query,
            }).map((icon) => ({
              import: icon.import,
              name: icon.name,
            })),
          ),
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
          text: JSON.stringify(component),
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
