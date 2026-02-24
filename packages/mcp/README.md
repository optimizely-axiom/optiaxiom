# @optiaxiom/mcp

MCP (Model Context Protocol) server for Axiom Design System. This server enables AI assistants like Claude Code and Cursor to access accurate component metadata, generating better code using the Axiom design system.

## What is MCP?

[Model Context Protocol (MCP)](https://modelcontextprotocol.io) is an open protocol by Anthropic that allows AI assistants to securely connect to external data sources and tools. This MCP server exposes Axiom's component library metadata to AI coding assistants.

## Features

- **Component Metadata**: Detailed information about all Axiom components including props, types, and descriptions
- **Search & Discovery**: Find components by name, keywords, or category
- **Usage Patterns**: Real-world code examples showing how components work together
- **Design Tokens**: Access to the complete design token system for Figma-to-code workflows
- **Setup Guides**: Markdown guides for getting started, CSS configuration, and icon usage
- **Fast & Lightweight**: Pre-generated metadata with instant response times

## Important Note

**All Axiom components are installed via a single npm package: `@optiaxiom/react`**

## Installation

### Global Installation

```bash
npm install -g @optiaxiom/mcp
# or
pnpm add -g @optiaxiom/mcp
```

### Project Installation

```bash
npm install --save-dev @optiaxiom/mcp
# or
pnpm add -D @optiaxiom/mcp
```

## Usage

### Claude Code

Add the MCP server to your workspace configuration file at `.vscode/mcp.json`:

```json
{
  "servers": {
    "axiom": {
      "command": "npx",
      "args": ["-y", "@optiaxiom/mcp"]
    }
  }
}
```

### Cursor

Add to your Cursor MCP configuration:

```json
{
  "mcpServers": {
    "axiom": {
      "command": "npx",
      "args": ["-y", "@optiaxiom/mcp"]
    }
  }
}
```

### Standalone Usage

You can also run the server directly:

```bash
npx @optiaxiom/mcp
```

## Available Tools

The MCP server provides the following tools that AI assistants can use:

### `get_component`

Get information about an Axiom component. Returns the component's description, import statement, and sub-components by default — no props. Use the optional `props` parameter to search for specific props by name or description.

**Parameters:**

- `name` (string, required): Component name (e.g., "Badge", "Button", "Alert")
- `props` (string, optional): Search query to find specific props by name or description (e.g., "appearance size", "loading", "padding background"). Omit to get just the component description, import, and sub-components without any props.

**Returns:** Component metadata with description, import statement, sub-components, examples, and optionally matching prop definitions.

### `search_components`

Search Axiom components by name, description, or keywords. Returns matching components.

**Parameters:**

- `query` (string, optional): Search query (component name, keyword, or description). Leave empty to browse all components or all components in a category.
- `category` (string, optional): Filter by category (e.g., "form", "layout", "navigation", "feedback", "overlay", "data-display", "actions", "typography")
- `limit` (number, optional): Maximum results to return (default: 5)

**Returns:** List of matching components with names, descriptions, and import statements.

### `get_patterns`

Find usage examples showing how Axiom components work together. Returns real working examples from the docs that demonstrate component composition patterns.

**Parameters:**

- `components` (string, required): Space-separated component names to find patterns for (e.g., "Field Input Button"). Returns examples that use these components together.
- `query` (string, optional): Search within example titles to find specific patterns (e.g., "addon", "form", "disabled").
- `limit` (number, optional): Maximum number of examples to return (default: 5, max: 10)

**Returns:** Array of matching examples with code (filename → file contents) and title.

### `get_tokens`

Get design token mappings for the Axiom Design System.

**Parameters:** None

**Returns:** Token-to-value mappings for colors, sizes, spacing, borderRadius, fontSize, boxShadow, duration, fontFamily, and zIndex. Useful for converting Figma design values to semantic tokens (e.g., `#4F576E` → `fg.secondary`, `32px` height → `h='md'`).

### `search_icons`

Search for icons from the `@optimizely/axiom-icons` package.

**Parameters:**

- `query` (string, required): Search query (icon keyword or name, e.g., "message", "arrow", "user")
- `limit` (number, optional): Maximum results to return (default: 10)

**Returns:** List of matching icon components with names and import statements.

## Available Resources

The MCP server exposes resources that can be accessed via URI patterns:

### Component Resources

- **URI Pattern:** `axiom://component/{name}`
- **MIME Type:** `application/json`
- **Description:** Metadata for individual Axiom components

Example: `axiom://component/Button` returns the complete metadata for the Button component.

### Guide Resources

- **URI Pattern:** `axiom://guide/{name}`
- **MIME Type:** `text/markdown`
- **Description:** Setup and configuration guides for Axiom Design System

Available guides:

- `axiom://guide/getting-started` - Installation and setup
- `axiom://guide/css-imports` - CSS import configuration
- `axiom://guide/css-layers` - CSS cascade layers setup
- `axiom://guide/icons` - Icon usage and configuration

## Example Interactions

Once configured, you can ask your AI assistant:

- "Show me how to use the Badge component"
- "Search for form components"
- "Create a form with Input and Button components from Axiom"
- "What navigation components are available?"
- "Show me patterns for Field and Select together"
- "What design tokens are available for colors?"
- "Convert this Figma color #4F576E to an Axiom token"
- "Show me the getting started guide for Axiom"
- "Search for message icons" (Optimizely staff only)
- "Find arrow icons" (Optimizely staff only)

The AI assistant will use the MCP server to get accurate, up-to-date information about Axiom components, tokens, and setup instructions.

## Development

### Building

```bash
pnpm -F mcp... build
```

### Architecture

#### Component Metadata Generation

The MCP server serves pre-generated component metadata that is automatically extracted from the `@optiaxiom/react` package at build time:

- **Component descriptions** come from JSDoc comments on component exports (e.g., `packages/react/src/table/Table.tsx`)
- **Props and types** are extracted from TypeScript definitions
- **Examples** are pulled from demo files in `apps/docs/demos/`
- **Usage warnings** are embedded in JSDoc and automatically included in the `description` field
- **Grouping and versioning** use JSDoc tags (`@group` and `@since`)

All data is bundled into the published package — there is no filesystem or network I/O at runtime.

**Important**: When adding warnings or guidance about component usage, add them to the component's JSDoc comment rather than the MCP server code. This ensures the information is:

- Visible in IDEs (hover tooltips)
- Included in generated documentation
- Automatically served by the MCP server
- Maintained in a single source of truth

#### JSDoc Tags

Use these tags in component JSDoc comments:

- **`@group`**: Groups related components together (e.g., `@group Table` groups Table, TableRow, TableCell, etc.)
- **`@since`**: Documents the version when the component was introduced (e.g., `@since 1.4.0`)
- **`@experimental`**: Marks components as experimental/unstable

Example:

```tsx
/**
 * Display tabular data using rows and columns.
 *
 * @group Table
 * @since 1.4.0
 */
export const Table = ...
```

## Resources

- [Axiom Design System](https://optimizely-axiom.github.io/optiaxiom/)
- [MCP Specification](https://modelcontextprotocol.io/specification)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

## Contributing

Contributions are welcome! Please see the main [repository](https://github.com/optimizely-axiom/optiaxiom) for contribution guidelines.

## License

Apache-2.0

## Support

For issues and questions:

- [GitHub Issues](https://github.com/optimizely-axiom/optiaxiom/issues)
- [Axiom Documentation](https://optimizely-axiom.github.io/optiaxiom/)
