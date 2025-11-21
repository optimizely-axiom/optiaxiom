# @optiaxiom/mcp-server

MCP (Model Context Protocol) server for Axiom Design System. This server enables AI assistants like Claude Code and Cursor to access accurate component metadata, generating better code using the Axiom design system.

## What is MCP?

[Model Context Protocol (MCP)](https://modelcontextprotocol.io) is an open protocol by Anthropic that allows AI assistants to securely connect to external data sources and tools. This MCP server exposes Axiom's component library metadata, design tokens, and usage patterns to AI coding assistants.

## Features

- **Component Metadata**: Detailed information about all Axiom components including props, types, and descriptions
- **Search Functionality**: Find components by name, category, or keywords
- **Usage Examples**: Real-world code examples for each component
- **Design Tokens**: Access to colors, spacing, typography, and other design tokens
- **Usage Patterns**: Common patterns and best practices for building UIs
- **Fast & Lightweight**: Cached metadata with sub-100ms response times

## Installation

### Global Installation

```bash
npm install -g @optiaxiom/mcp-server
# or
pnpm add -g @optiaxiom/mcp-server
```

### Project Installation

```bash
npm install --save-dev @optiaxiom/mcp-server
# or
pnpm add -D @optiaxiom/mcp-server
```

## Usage

### With Claude Code

Add to your `.vscode/mcp.json` or project MCP configuration:

```json
{
  "servers": {
    "axiom": {
      "command": "npx",
      "args": ["-y", "@optiaxiom/mcp-server"]
    }
  }
}
```

Or if installed globally:

```json
{
  "servers": {
    "axiom": {
      "command": "axiom-mcp"
    }
  }
}
```

### With Cursor

Add to your Cursor MCP settings:

```json
{
  "mcpServers": {
    "axiom": {
      "command": "npx",
      "args": ["-y", "@optiaxiom/mcp-server"]
    }
  }
}
```

### Standalone Usage

You can also run the server directly:

```bash
npx @optiaxiom/mcp-server
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
- `category` (string, optional): Filter by category
- `limit` (number, optional): Max results (default: 10)

**Example:**
```
Search for navigation components
→ Returns: List of navigation-related components
```

### `get_pattern`

Get common usage patterns and best practices.

**Parameters:**
- `name` (string, required): Pattern name (e.g., "form-layout")

**Example:**
```
Show me the form layout pattern
→ Returns: Complete pattern with code example and guidelines
```

### `get_tokens`

Get design tokens (colors, spacing, typography, etc.).

**Parameters:**
- `category` (string, optional): Token category or "all" (default: "all")

**Example:**
```
Get all color tokens
→ Returns: All color tokens with values and descriptions
```

### `list_categories`

List all component categories with counts.

**Example:**
```
List all component categories
→ Returns: Categories with component counts and names
```

## Component Categories

- **layout**: Box, Flex, Grid, Stack, Container, Divider
- **navigation**: Nav, Breadcrumb, Tabs, Link
- **feedback**: Badge, Alert, Spinner, Progress, Toast
- **forms**: Button, Input, Checkbox, Select, Switch, Textarea
- **overlays**: Dialog, Menu, Tooltip, Popover
- **data-display**: Table, Card, Avatar, Code
- **typography**: Text, Heading
- **utilities**: Portal, VisuallyHidden, Transition

## Example Interactions

Once configured, you can ask your AI assistant:

- "Show me how to use the Badge component"
- "Create a form with Input and Button components from Axiom"
- "What navigation components are available?"
- "Show me the color tokens"
- "Create a card layout using Axiom components"

The AI assistant will use the MCP server to get accurate, up-to-date information about Axiom components.

## Development

### Building

```bash
pnpm run build
```

### Generating Metadata

```bash
pnpm run generate-metadata
```

This will generate component metadata from the `@optiaxiom/react` package.

### Type Checking

```bash
pnpm run typecheck
```

### Running Locally

```bash
pnpm run dev
```

## Metadata Structure

The server exposes metadata in the following structure:

- `src/data/components.json`: Component registry index
- `src/data/components/*.json`: Individual component metadata
- `src/data/tokens.json`: Design tokens
- `src/data/patterns.json`: Usage patterns

## Resources

- [Axiom Design System](https://optimizely-axiom.github.io/optiaxiom/)
- [MCP Specification](https://modelcontextprotocol.io/specification)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

## Contributing

Contributions are welcome! Please see the main [OptiAxiom repository](https://github.com/optimizely-axiom/optiaxiom) for contribution guidelines.

## License

Apache-2.0

## Support

For issues and questions:
- [GitHub Issues](https://github.com/optimizely-axiom/optiaxiom/issues)
- [Axiom Documentation](https://optimizely-axiom.github.io/optiaxiom/)
