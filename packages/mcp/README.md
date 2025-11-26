# @optiaxiom/mcp

MCP (Model Context Protocol) server for Axiom Design System. This server enables AI assistants like Claude Code and Cursor to access accurate component metadata, generating better code using the Axiom design system.

## What is MCP?

[Model Context Protocol (MCP)](https://modelcontextprotocol.io) is an open protocol by Anthropic that allows AI assistants to securely connect to external data sources and tools. This MCP server exposes Axiom's component library metadata to AI coding assistants.

## Features

- **Component Metadata**: Detailed information about all Axiom components including props, types, and descriptions
- **Search Functionality**: Find components by name or keywords
- **Usage Examples**: Real-world code examples for each component
- **Fast & Lightweight**: Cached metadata with sub-100ms response times

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

Get detailed information about a specific component.

**Parameters:**

- `name` (string, required): Component name (e.g., "Badge", "Button")
- `includeExamples` (boolean, optional): Include usage examples (default: true)

**Example:**

```
Get information about the Badge component
→ Returns: Complete component metadata with props, examples, and usage
```

### `search_components`

Search for components by name, description, or keywords.

**Parameters:**

- `query` (string, required): Search query
- `limit` (number, optional): Max results (default: 10)

**Example:**

```
Search for navigation components
→ Returns: List of navigation-related components
```

## Example Interactions

Once configured, you can ask your AI assistant:

- "Show me how to use the Badge component"
- "Create a form with Input and Button components from Axiom"
- "What navigation components are available?"
- "Create a card layout using Axiom components"

The AI assistant will use the MCP server to get accurate, up-to-date information about Axiom components.

## Development

### Building

```bash
pnpm run build
```

### Running Locally

```bash
pnpm run dev
```

## Metadata Structure

The server exposes metadata generated at build time:

- `data/metadata.json`: Generation metadata and versions
- `data/tokens.json`: Design token mappings
- `data/components/*.json`: Individual component metadata (182+ files)

**Note:** The `data/` directory is generated during the build process and is not checked into git. Run `pnpm generate` to create it locally.

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
