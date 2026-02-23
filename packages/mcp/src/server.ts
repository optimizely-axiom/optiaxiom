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
import { createArrayResponse, createResponse } from "./responses.js";
import {
  searchComponents,
  searchExamples,
  searchIcons,
  searchProps,
} from "./search.js";

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
    description: `🚨 CRITICAL: ALWAYS read component info to get actual defaults and behavior - DO NOT assume based on standard HTML/CSS!

⚠️ VALIDATION REQUIRED WHEN USING EXTERNAL CODE: If component names came from Figma, screenshots, or other external sources, validate them with search_components() FIRST. External tools generate invalid names (BreadcrumbItem, TabsTab don't exist in Axiom).

✅ USE GROUP FOR FLEXBOX LAYOUTS (PREFERRED):
- Group is a flexbox layout component for arranging items horizontally or vertically
- Group defaults to flexDirection='row' (CSS standard - horizontal layout)
- Group defaults to alignItems='center' (when row) or 'stretch' (when column)
- Group has NO default gap - you must specify it explicitly
- For form layouts with Input/Button/Textarea in column direction: use alignItems='start' to prevent inputs from stretching to full width
- Examples:
  - Horizontal button group: <Group gap="8"><Button /><Button /></Group>
  - Vertical form: <Group flexDirection="column" gap="16" alignItems="start"><Input /><Button /></Group>
  - Icon + text: <Group gap="4"><Icon /><Text /></Group>

⚠️ FLEX COMPONENT IS DEPRECATED (DO NOT USE):
- Flex is deprecated since v1.8.0 and will be removed in v2.0
- Use Group instead for all new code
- To migrate existing Flex code: \`npx @optiaxiom/codemod flex-to-group src/\`
- If you must use Flex (legacy code only):
  - Flex defaults to flexDirection='column' (VERTICAL), NOT 'row' like standard CSS
  - Flex defaults to gap='16' (automatic spacing)
  - Flex defaults to alignItems='stretch' in column layouts, 'center' in row layouts
  - For form layouts with Input/Button/Textarea: use alignItems='start' to prevent inputs from stretching
  - Example: <Flex alignItems="start"><Input /><Button /></Flex>

📋 LAYOUT COMPONENT BEST PRACTICES:
- Use Group for flexbox layouts (direction, gap, alignment)
- Use Box for simple styling (padding, margin, borders, colors)
- Box is a lighter primitive; only use Group when you need flexbox layout features

⚠️ TABLE COMPONENT PREFERENCE:
- ALWAYS use DataTable instead of Table for displaying tabular data
- Table is a low-level primitive; DataTable provides sorting, pagination, filtering, etc.
- DataTable is built with TanGroup Table and offers a much better developer experience
- Only use Table directly for very specific custom table layouts

📦 STYLE PROPS: Most components support style props (bg, p, m, gap, etc.).
Use the "props" parameter to search for them by description — e.g., props: "padding background" will find the "p" and "bg" props with their allowed values.

---

Get information about an Axiom component. Returns the component's description, import statement, and sub-components by default — no props.

Use the optional "props" parameter to search for specific props by name or description. This searches both component-specific props and style props (bg, p, m, gap, etc.) — you don't need to know shorthand names, just describe what you want (e.g., "padding" finds the "p" prop).

Examples:
  get_component({ name: "Dialog" }) → description, import, sub-components
  get_component({ name: "Button", props: "appearance size" }) → + matching prop definitions
  get_component({ name: "Box", props: "padding background" }) → + p and bg prop definitions

NOTE: All Axiom components are installed via the same npm package: npm install @optiaxiom/react`,
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
          text: jsonify({
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

// Tool: list_components
server.registerTool(
  "list_components",
  {
    description: `List all available Axiom components with their descriptions. Use this to discover what components are available. After selecting a component, use get_component() to read its full documentation.

⚠️ VALIDATION TIP: Use this list to verify component names from Figma/external sources. If a name doesn't appear here, it doesn't exist in Axiom.

NOTE: All Axiom components are installed via the same npm package: npm install @optiaxiom/react`,
    inputSchema: {},
    title: "List Components",
  },
  async () => {
    return {
      content: [
        {
          text: jsonify(
            createArrayResponse(
              getAllComponents()
                // Only return primary components (those without a group, or
                // those where name === group)
                .filter((c) => !c.group || c.name === c.group)
                .map((component) => ({
                  category: component.category,
                  description: component.description,
                  name: component.name,
                })),
            ),
          ),
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
    description: `Search Axiom components by name, description, or keywords. Returns a list of matching components. After finding a component, use get_component() to read full details. Use get_component() with a "props" query to look up specific props including style props (bg, p, m, gap, etc.).

🔍 VALIDATION TIP: When working with Figma/external code, call this tool to validate component names before use.

Common invalid names from Figma:
- BreadcrumbItem, BreadcrumbLink → Use Breadcrumb with items prop
- TabsTab → Use TabsTrigger

NOTE: All Axiom components are installed via the same npm package: npm install @optiaxiom/react`,
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
        .default(10)
        .describe("Maximum results to return (default: 10)"),
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
          text: jsonify(
            createArrayResponse(
              searchComponents({
                category,
                components: getAllComponents(),
                limit,
                query,
              }).map((result) => ({
                category: result.category,
                description: result.description,
                import: result.import,
                name: result.name,
              })),
              { query },
            ),
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

Use this to learn how components compose — e.g., Field wrapping Input, Dialog sub-component structure, or form layouts with Group.

Examples:
  get_patterns({ components: "Field Input Button" }) → examples showing forms with fields and buttons
  get_patterns({ components: "Dialog" }) → examples showing full Dialog composition with sub-components

NOTE: All Axiom components are installed via the same npm package: npm install @optiaxiom/react`,
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
          text: jsonify(
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
server.registerTool(
  "get_tokens",
  {
    description: `⚠️ EXTERNAL CODE TIP: Use this to convert Figma's hardcoded values (hex colors, px sizes) to Axiom's semantic tokens (bg.*, fg.*, h='md').

---

Get design token mappings for the Axiom Design System. Returns token-to-value mappings for: colors (hex values for light mode), sizes (px/rem for width/height), spacing (px/rem for margin/padding/gap), borderRadius, fontSize (with lineHeight), boxShadow, duration, fontFamily, and zIndex. Use this to convert Figma design values to semantic tokens (e.g., #4F576E → fg.secondary, 32px height → h='md'). NOTE: All Axiom components are installed via the same npm package: npm install @optiaxiom/react`,
    inputSchema: {},
    title: "Get Design Tokens",
  },
  async () => {
    return {
      content: [
        {
          text: jsonify(createResponse(getTokens())),
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
    description: `Search for icons from the @optimizely/axiom-icons package. This is a private package containing licensed Font Awesome Pro icons for Optimizely staff. Returns a list of matching icon component names. You can search by keywords (e.g., 'message', 'arrow', 'user') and the search will match icon names intelligently. NOTE: The @optimizely/axiom-icons package is private and only available to Optimizely staff.`,
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
          text: jsonify(
            createArrayResponse(
              searchIcons({
                icons: getAllIcons(),
                limit,
                query,
              }).map((icon) => ({
                import: icon.import,
                name: icon.name,
              })),
              { query },
            ),
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
