import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import type { ComponentMetadata, ComponentRegistry } from '../types/component.js';
import type { DesignTokens } from '../types/token.js';
import type { Pattern } from '../types/pattern.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Service for loading and caching component metadata
 */
export class MetadataLoader {
  private cache: Map<string, unknown> = new Map();
  private cacheExpiry: number = 5 * 60 * 1000; // 5 minutes
  private dataDir: string;

  constructor() {
    // Path to the data directory (will be in dist/data after build)
    this.dataDir = join(__dirname, '..', 'data');
  }

  /**
   * Get the component registry index
   */
  async getRegistry(): Promise<ComponentRegistry> {
    const cacheKey = 'registry';

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey) as ComponentRegistry;
    }

    const registry = await this.loadJSON<ComponentRegistry>(
      join(this.dataDir, 'components.json')
    );

    this.setCacheWithExpiry(cacheKey, registry);
    return registry;
  }

  /**
   * Get metadata for a specific component
   */
  async getComponent(name: string): Promise<ComponentMetadata | null> {
    const cacheKey = `component:${name}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey) as ComponentMetadata | null;
    }

    try {
      const component = await this.loadJSON<ComponentMetadata>(
        join(this.dataDir, 'components', `${name.toLowerCase()}.json`)
      );

      this.setCacheWithExpiry(cacheKey, component);
      return component;
    } catch (error) {
      // Component not found
      this.setCacheWithExpiry(cacheKey, null);
      return null;
    }
  }

  /**
   * Get all components
   */
  async getAllComponents(): Promise<ComponentMetadata[]> {
    const registry = await this.getRegistry();
    const components = await Promise.all(
      registry.components.map((name) => this.getComponent(name))
    );

    return components.filter((c): c is ComponentMetadata => c !== null);
  }

  /**
   * Get design tokens
   */
  async getTokens(): Promise<DesignTokens> {
    const cacheKey = 'tokens';

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey) as DesignTokens;
    }

    const tokens = await this.loadJSON<DesignTokens>(
      join(this.dataDir, 'tokens.json')
    );

    this.setCacheWithExpiry(cacheKey, tokens);
    return tokens;
  }

  /**
   * Get a specific pattern
   */
  async getPattern(name: string): Promise<Pattern | null> {
    const patterns = await this.listPatterns();
    return patterns.find((p) => p.name === name) ?? null;
  }

  /**
   * List all available patterns
   */
  async listPatterns(): Promise<Pattern[]> {
    const cacheKey = 'patterns';

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey) as Pattern[];
    }

    try {
      const patterns = await this.loadJSON<Pattern[]>(
        join(this.dataDir, 'patterns.json')
      );

      this.setCacheWithExpiry(cacheKey, patterns);
      return patterns;
    } catch (error) {
      // No patterns file yet
      return [];
    }
  }

  /**
   * Load and parse a JSON file
   */
  private async loadJSON<T>(path: string): Promise<T> {
    const content = await readFile(path, 'utf-8');
    return JSON.parse(content) as T;
  }

  /**
   * Set cache entry with automatic expiry
   */
  private setCacheWithExpiry(key: string, value: unknown): void {
    this.cache.set(key, value);

    // Clear cache after expiry
    setTimeout(() => {
      this.cache.delete(key);
    }, this.cacheExpiry);
  }

  /**
   * Clear all cached data
   */
  clearCache(): void {
    this.cache.clear();
  }
}
