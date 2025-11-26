# Contributing to Axiom MCP Server

Thank you for your interest in contributing! This guide will help you understand the codebase structure and conventions.

## Getting Started

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Generate component metadata**:
   ```bash
   pnpm -F mcp generate
   ```

3. **Build the project**:
   ```bash
   pnpm exec tsc -b packages/mcp/
   ```

## Project Structure

```
packages/mcp/
├── src/
│   ├── server.ts           # MCP server and tool definitions
│   ├── types.ts            # TypeScript type definitions
│   ├── responses.ts        # Response helper functions
│   ├── loaders.ts          # Data loading utilities
│   ├── search.ts           # Component search logic
│   └── data/
│       ├── metadata.json   # Generation metadata
│       └── components/     # Individual component JSON files
├── scripts/
│   └── generate.ts         # Metadata generation script
└── CONTRIBUTING.md         # This file
```

## Tool Response Format

All tools in this MCP server follow a standardized response format to ensure consistency for AI clients.

### Single Item Response

Use `createResponse()` for returning a single item:

```typescript
import { createResponse } from "./responses.js";
import { getMetadata } from "./loaders.js";

// Example
const component = getComponent("Button");
return {
  content: [{
    text: JSON.stringify(
      createResponse(component, getMetadata()),
      null,
      2
    ),
    type: "text" as const,
  }],
};
```

**Response structure:**
```json
{
  "_meta": {
    "generatedAt": "2025-11-25T14:46:44.046Z",
    "generator": {
      "name": "@optiaxiom/mcp",
      "version": "0.1.0"
    },
    "source": {
      "package": "@optiaxiom/react",
      "version": "1.7.11"
    }
  },
  "data": {
    // Your single item here
  }
}
```

### Array Response

Use `createArrayResponse()` for returning multiple items:

```typescript
import { createArrayResponse } from "./responses.js";
import { getMetadata } from "./loaders.js";

// Example without query
const components = getAllComponents();
return {
  content: [{
    text: JSON.stringify(
      createArrayResponse(components, getMetadata()),
      null,
      2
    ),
    type: "text" as const,
  }],
};

// Example with query
return {
  content: [{
    text: JSON.stringify(
      createArrayResponse(results, getMetadata(), { query: "button" }),
      null,
      2
    ),
    type: "text" as const,
  }],
};
```

**Response structure:**
```json
{
  "_meta": {
    "generatedAt": "2025-11-25T14:46:44.046Z",
    "generator": {
      "name": "@optiaxiom/mcp",
      "version": "0.1.0"
    },
    "source": {
      "package": "@optiaxiom/react",
      "version": "1.7.11"
    }
  },
  "count": 10,
  "data": [
    // Array items here
  ],
  "query": "optional search query"
}
```

## Why These Conventions?

### 1. **Consistency**
All tool responses follow the same structure, making it easier for AI clients to parse and understand.

### 2. **Metadata Tracking**
Every response includes `_meta` with:
- **generatedAt**: ISO timestamp when the data was generated
- **generator**: Which version of the MCP server created this
- **source**: Which version of @optiaxiom/react this came from

This helps with:
- Debugging ("which version generated this?")
- Cache invalidation
- Understanding data freshness

### 3. **Type Safety**
The helper functions enforce the correct structure at compile time through TypeScript types:
- `StandardResponse<T>` for single items
- `ArrayResponse<T>` for arrays

### 4. **AI-Friendly**
- `_meta` prefix signals metadata (not actual data)
- `data` consistently contains the payload
- `count` provides quick reference for array length
- Optional `query` shows what search produced these results

## Adding New Tools

When adding a new tool:

1. **Import the helpers**:
   ```typescript
   import { createResponse, createArrayResponse } from "./responses.js";
   import { getMetadata } from "./loaders.js";
   ```

2. **Use the appropriate helper**:
   - Single item → `createResponse(data, getMetadata())`
   - Array → `createArrayResponse(data, getMetadata())`
   - Array with query → `createArrayResponse(data, getMetadata(), { query })`

3. **Don't manually construct responses** - the helpers ensure consistency

## Examples

See [src/server.ts](./src/server.ts) for real-world examples:
- `get_component` - Single item response
- `list_components` - Array response
- `search_components` - Array response with query

## Type Definitions

See [src/types.ts](./src/types.ts) for:
- `StandardResponse<T>` - Single item response type
- `ArrayResponse<T>` - Array response type
- `Metadata` - Metadata structure

See [src/responses.ts](./src/responses.ts) for the helper function implementations.
