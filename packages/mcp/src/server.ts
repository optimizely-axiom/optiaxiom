import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import pkg from "../package.json";
import {
  getAllComponents,
  getAllGuides,
  getAllIcons,
  getAllTests,
  getComponent,
  getGuide,
  getTokens,
} from "./loaders.js";
import {
  searchComponents,
  searchExamples,
  searchIcons,
  searchProps,
  searchTests,
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
    description: `Find usage examples showing how Axiom components work together. When you are about to write or compose JSX that uses one or more Axiom components together, refer to this to follow real, working patterns from the docs instead of guessing the API.

Returns real examples that demonstrate component composition (which sub-components to use, required props, and how pieces wire together).

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

// Tool: get_tests
const testHelperNote = `These tests use the repo's custom render helper, imported as \`../../vitest.rtl\` (packages/react/vitest.rtl.ts). It differs from stock @testing-library/react in two ways you must preserve when writing new tests:
1. \`render()\` automatically wraps the tree in \`AxiomProvider\` — Axiom components rely on this context, so never wrap them yourself.
2. \`render()\` returns \`{ user }\` (a configured \`userEvent\` instance) in addition to the usual RTL result — use \`const { user } = render(...)\` for interactions instead of calling \`userEvent.setup()\`.
Everything else (\`screen\`, \`waitFor\`, queries, matchers) is re-exported from @testing-library/react. Prefer role/name queries (getByRole("alert"), getByRole("button", { name: "close" })) to assert accessibility, mirroring these examples.`;

server.registerTool(
  "get_tests",
  {
    description: `Get vetted reference test files for Axiom components. When the user asks to write, generate, add, or fix a test / spec / *.spec.tsx / *.test.tsx for any Axiom component, refer to this to follow the repo's established conventions instead of generic React Testing Library habits.

These reference tests show how this repo renders components, queries them by role and accessible name, and asserts accessibility (ARIA roles, labels) and interactions. The response also includes a note explaining the custom \`vitest.rtl\` render helper the tests rely on (auto-wraps in AxiomProvider and returns a \`user\` for interactions) — match it when writing new tests.

Examples:
  get_tests({ components: "Alert" }) → the Alert spec showing role="alert" and dismiss-button assertions
  get_tests({ components: "Button" }) → role/name queries, click + disabled + loading interactions
  get_tests({ components: "Tooltip" }) → hover/focus interactions and accessible-name assertions
  get_tests() → list all available reference test files (and the helper note)`,
    inputSchema: {
      components: z
        .string()
        .optional()
        .describe(
          'Space-separated component names to find reference tests for (e.g., "Alert Button"). Returns tests that use these components. Omit to list all available reference tests.',
        ),
      limit: z
        .number()
        .min(1)
        .max(10)
        .optional()
        .default(5)
        .describe(
          "Maximum number of reference tests to return when searching by component (default: 5). Ignored when listing all tests.",
        ),
    },
    title: "Get Tests",
  },
  async ({ components, limit }) => {
    // Listing all tests is a discovery call — omit source to keep it light.
    const listing = !components?.trim();
    return {
      content: [
        {
          text: JSON.stringify({
            helper: testHelperNote,
            tests: searchTests({ components, data: getAllTests(), limit }).map(
              (test) =>
                listing
                  ? { components: test.components, name: test.name }
                  : test,
            ),
          }),
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

// Tool: get_guides
server.registerTool(
  "get_guides",
  {
    description: `Get setup, configuration, and integration guides for the Axiom Design System. Refer to these when setting up Axiom, importing its CSS, configuring CSS layers, using icons, or integrating Axiom into a host app — instead of guessing the setup steps.

Examples:
  get_guides({ names: "getting-started" }) → the getting-started guide content
  get_guides({ names: "css-imports css-layers" }) → both CSS setup guides
  get_guides() → list all available guides (names + titles)`,
    inputSchema: {
      names: z
        .string()
        .optional()
        .describe(
          'Space-separated guide names to fetch (e.g., "css-imports css-layers"). Omit to list all available guides.',
        ),
    },
    title: "Get Guides",
  },
  async ({ names }) => {
    const requested = names?.trim().split(/\s+/);

    // Listing all guides is a discovery call — omit content to keep it light.
    if (!requested?.length) {
      return {
        content: [
          {
            text: JSON.stringify(
              getAllGuides().map((guide) => ({
                name: guide.name,
                title: guide.title,
              })),
            ),
            type: "text" as const,
          },
        ],
      };
    }

    const guides = requested.map((name) => {
      const guide = getGuide(name);
      return guide
        ? { content: guide.content, name: guide.name, title: guide.title }
        : { error: `Guide not found: ${name}`, name };
    });

    return {
      content: [
        {
          text: JSON.stringify({
            available: getAllGuides().map((guide) => guide.name),
            guides,
          }),
          type: "text" as const,
        },
      ],
    };
  },
);
