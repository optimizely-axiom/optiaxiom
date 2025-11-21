# @optiaxiom/mcp

MCP (Model Context Protocol) server for Axiom Design System. This server enables AI assistants like Claude Code and Cursor to access accurate component metadata, generating better code using the Axiom design system.

## What is MCP?

[Model Context Protocol (MCP)](https://modelcontextprotocol.io) is an open protocol by Anthropic that allows AI assistants to securely connect to external data sources and tools. This MCP server exposes Axiom's component library metadata to AI coding assistants.

## Features

- **Component Metadata**: Detailed information about all Axiom components including props, types, and descriptions
- **Search & Discovery**: Find components by name, keywords, or list all available components
- **Usage Examples**: Real-world code examples with screenshots for each component
- **Design Tokens**: Access to the complete design token system for Figma-to-code workflows
- **Setup Guides**: Markdown guides for getting started, CSS configuration, and icon usage
- **Fast & Lightweight**: Pre-generated metadata with instant response times

## Important Note

**All Axiom components are installed via a single npm package: `@optiaxiom/react`**

This MCP server provides metadata about components from both stable (`@optiaxiom/react`) and experimental (`@optiaxiom/react/unstable`) exports, but they all come from the same npm package. When the AI assistant generates code using Axiom components, it only needs to install `@optiaxiom/react`.

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

### With Claude Code or Cursor

Add to your `.vscode/mcp.json` or project MCP configuration:

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

### Standalone Usage

You can also run the server directly:

```bash
npx @optiaxiom/mcp
```

## Available Tools

The MCP server provides the following tools that AI assistants can use:

### `get_component`

Get detailed information about a specific component including props, examples, and usage guidelines.

**Parameters:**

- `name` (string, required): Component name (e.g., "Badge", "Button", "Alert")

**Returns:** Complete component metadata with props, examples, screenshots, and usage information.

### `list_components`

List all available Axiom components with their descriptions. Use this to discover what components are available.

**Parameters:** None

**Returns:** Array of all primary components with names and descriptions.

### `search_components`

Search for components by name, description, or keywords.

**Parameters:**

- `query` (string, required): Search query (component name, keyword, or description)
- `limit` (number, optional): Maximum results to return (default: 10)

**Returns:** List of matching components with names, descriptions, and import statements.

### `get_tokens`

Get design token mappings for the Axiom Design System.

**Parameters:** None

**Returns:** Token-to-value mappings for colors (hex values for light mode), sizes (px/rem for width/height), spacing, borderRadius, fontSize (with lineHeight), boxShadow, duration, fontFamily, and zIndex. Useful for converting Figma design values to semantic tokens (e.g., `#4F576E` → `fg.secondary`, `32px` height → `h='md'`).

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
- "List all available Axiom components"
- "Create a form with Input and Button components from Axiom"
- "What navigation components are available?"
- "Create a card layout using Axiom components"
- "What design tokens are available for colors?"
- "Convert this Figma color #4F576E to an Axiom token"
- "Show me the getting started guide for Axiom"

The AI assistant will use the MCP server to get accurate, up-to-date information about Axiom components, tokens, and setup instructions.

## Development

### Building

```bash
pnpm -F mcp... build
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
