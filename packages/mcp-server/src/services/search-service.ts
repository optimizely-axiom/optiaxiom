import type { ComponentMetadata, ComponentCategory } from '../types/component.js';
import type { MetadataLoader } from './metadata-loader.js';

export interface SearchOptions {
  /** Search query */
  query: string;

  /** Filter by category */
  category?: ComponentCategory;

  /** Maximum number of results */
  limit?: number;
}

export interface SearchResult {
  /** Component metadata */
  component: ComponentMetadata;

  /** Relevance score (0-1) */
  score: number;
}

/**
 * Service for searching components
 */
export class SearchService {
  constructor(private metadataLoader: MetadataLoader) {}

  /**
   * Search components by query string
   */
  async search(options: SearchOptions): Promise<ComponentMetadata[]> {
    const { query, category, limit = 10 } = options;

    // Get all components
    let components = await this.metadataLoader.getAllComponents();

    // Filter by category if specified
    if (category) {
      components = components.filter((c) => c.category === category);
    }

    // If query is empty, return filtered results
    if (!query.trim()) {
      return components.slice(0, limit);
    }

    // Score and rank components
    const results: SearchResult[] = components
      .map((component) => ({
        component,
        score: this.calculateRelevanceScore(component, query),
      }))
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score);

    // Return top results
    return results.slice(0, limit).map((r) => r.component);
  }

  /**
   * Calculate relevance score for a component
   */
  private calculateRelevanceScore(
    component: ComponentMetadata,
    query: string
  ): number {
    const normalizedQuery = query.toLowerCase().trim();
    let score = 0;

    // Exact name match (highest priority)
    if (component.name.toLowerCase() === normalizedQuery) {
      score += 100;
    }

    // Name starts with query
    if (component.name.toLowerCase().startsWith(normalizedQuery)) {
      score += 50;
    }

    // Name contains query
    if (component.name.toLowerCase().includes(normalizedQuery)) {
      score += 25;
    }

    // Description contains query
    if (component.description.toLowerCase().includes(normalizedQuery)) {
      score += 15;
    }

    // Keywords match
    if (component.keywords) {
      const keywordMatch = component.keywords.some((keyword) =>
        keyword.toLowerCase().includes(normalizedQuery)
      );
      if (keywordMatch) {
        score += 20;
      }
    }

    // Category name matches
    if (component.category.toLowerCase().includes(normalizedQuery)) {
      score += 10;
    }

    // Related components match
    if (component.relatedComponents) {
      const relatedMatch = component.relatedComponents.some((related) =>
        related.toLowerCase().includes(normalizedQuery)
      );
      if (relatedMatch) {
        score += 5;
      }
    }

    return score;
  }

  /**
   * Find components by category
   */
  async findByCategory(category: ComponentCategory): Promise<ComponentMetadata[]> {
    const components = await this.metadataLoader.getAllComponents();
    return components.filter((c) => c.category === category);
  }

  /**
   * Find components that use a specific prop
   */
  async findByProp(propName: string): Promise<ComponentMetadata[]> {
    const components = await this.metadataLoader.getAllComponents();
    return components.filter((c) => propName in c.props);
  }
}
