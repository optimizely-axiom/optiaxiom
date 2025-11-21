import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { MetadataLoader } from '../services/metadata-loader.js';
import { SearchService } from '../services/search-service.js';
import type { ComponentCategory } from '../types/component.js';
import type { TokenCategory } from '../types/token.js';

const COMPONENT_CATEGORIES: ComponentCategory[] = [
  'layout',
  'navigation',
  'feedback',
  'forms',
  'overlays',
  'data-display',
  'utilities',
  'typography',
  'primitives',
];

const TOKEN_CATEGORIES: TokenCategory[] = [
  'colors',
  'spacing',
  'typography',
  'shadows',
  'borderRadius',
  'zIndex',
  'all',
];

/**
 * Axiom Design System MCP Server
 */
export class AxiomMCPServer {
  private server: Server;
  private metadataLoader: MetadataLoader;
  private searchService: SearchService;

  constructor() {
    this.server = new Server(
      {
        name: '@optiaxiom/mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      }
    );

    this.metadataLoader = new MetadataLoader();
    this.searchService = new SearchService(this.metadataLoader);

    this.setupHandlers();
  }

  private setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'get_component',
          description: 'Get detailed information about a specific Axiom component including props, examples, and usage guidelines',
          inputSchema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Component name (e.g., "Badge", "Button", "Alert")',
              },
              includeExamples: {
                type: 'boolean',
                description: 'Include usage examples (default: true)',
              },
            },
            required: ['name'],
          },
        },
        {
          name: 'search_components',
          description: 'Search Axiom components by name, description, category, or keywords. Returns a list of matching components.',
          inputSchema: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'Search query (component name, keyword, or description)',
              },
              category: {
                type: 'string',
                enum: COMPONENT_CATEGORIES,
                description: 'Filter by category',
              },
              limit: {
                type: 'number',
                description: 'Maximum results to return (default: 10)',
              },
            },
            required: ['query'],
          },
        },
        {
          name: 'get_pattern',
          description: 'Get common usage patterns and best practices for building UIs with Axiom components',
          inputSchema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Pattern name (e.g., "form-layout", "navigation-menu")',
              },
            },
            required: ['name'],
          },
        },
        {
          name: 'get_tokens',
          description: 'Get Axiom design tokens including colors, spacing, typography, shadows, border radius, and z-index values',
          inputSchema: {
            type: 'object',
            properties: {
              category: {
                type: 'string',
                enum: TOKEN_CATEGORIES,
                description: 'Token category (default: all)',
              },
            },
          },
        },
        {
          name: 'list_categories',
          description: 'List all component categories with component counts and names. Useful for discovering what types of components are available.',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
      ],
    }));

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'get_component':
            return await this.handleGetComponent(args);
          case 'search_components':
            return await this.handleSearchComponents(args);
          case 'get_pattern':
            return await this.handleGetPattern(args);
          case 'get_tokens':
            return await this.handleGetTokens(args);
          case 'list_categories':
            return await this.handleListCategories();
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text' as const,
              text: `Error: ${errorMessage}`,
            },
          ],
        };
      }
    });

    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      const registry = await this.metadataLoader.getRegistry();

      return {
        resources: registry.components.map((name) => ({
          uri: `axiom://component/${name}`,
          name: `Component: ${name}`,
          mimeType: 'application/json',
          description: `Metadata for ${name} component`,
        })),
      };
    });

    // Read resource
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const uri = request.params.uri;
      const match = uri.match(/^axiom:\/\/component\/(.+)$/);

      if (!match || !match[1]) {
        throw new Error(`Invalid resource URI: ${uri}`);
      }

      const componentName = match[1];
      const component = await this.metadataLoader.getComponent(componentName);

      if (!component) {
        throw new Error(`Component not found: ${componentName}`);
      }

      return {
        contents: [
          {
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(component, null, 2),
          },
        ],
      };
    });
  }

  private async handleGetComponent(args: unknown) {
    const schema = z.object({
      name: z.string(),
      includeExamples: z.boolean().optional().default(true),
    });

    const { name, includeExamples } = schema.parse(args);
    const component = await this.metadataLoader.getComponent(name);

    if (!component) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `Component "${name}" not found in Axiom Design System.\n\nUse the search_components tool to find available components.`,
          },
        ],
      };
    }

    // Optionally filter out examples to reduce response size
    const result = includeExamples
      ? component
      : { ...component, examples: [] };

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }

  private async handleSearchComponents(args: unknown) {
    const schema = z.object({
      query: z.string(),
      category: z.enum(COMPONENT_CATEGORIES as [string, ...string[]]).optional(),
      limit: z.number().optional().default(10),
    });

    const { query, category, limit } = schema.parse(args);
    const results = await this.searchService.search({
      query,
      category: category as ComponentCategory | undefined,
      limit,
    });

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(
            {
              query,
              category: category || 'all',
              count: results.length,
              results: results.map((r) => ({
                name: r.name,
                category: r.category,
                description: r.description,
                import: r.import,
              })),
            },
            null,
            2
          ),
        },
      ],
    };
  }

  private async handleGetPattern(args: unknown) {
    const schema = z.object({
      name: z.string(),
    });

    const { name } = schema.parse(args);
    const pattern = await this.metadataLoader.getPattern(name);

    if (!pattern) {
      // List available patterns
      const patterns = await this.metadataLoader.listPatterns();
      return {
        content: [
          {
            type: 'text' as const,
            text: `Pattern "${name}" not found.\n\nAvailable patterns:\n${patterns.map((p) => `- ${p.name}: ${p.description}`).join('\n')}`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(pattern, null, 2),
        },
      ],
    };
  }

  private async handleGetTokens(args: unknown) {
    const schema = z.object({
      category: z.enum(TOKEN_CATEGORIES as [string, ...string[]]).optional().default('all'),
    });

    const { category } = schema.parse(args);
    const tokens = await this.metadataLoader.getTokens();

    const result =
      category === 'all'
        ? tokens
        : { [category]: tokens[category as keyof typeof tokens] };

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }

  private async handleListCategories() {
    const registry = await this.metadataLoader.getRegistry();

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(
            {
              totalComponents: registry.componentCount,
              categories: Object.entries(registry.categories).map(
                ([name, components]) => ({
                  name,
                  count: components.length,
                  components,
                })
              ),
            },
            null,
            2
          ),
        },
      ],
    };
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Axiom MCP Server running on stdio');
  }
}
