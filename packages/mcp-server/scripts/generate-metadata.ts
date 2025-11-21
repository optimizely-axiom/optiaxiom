#!/usr/bin/env tsx

import { writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type {
  ComponentMetadata,
  ComponentRegistry,
  ComponentCategory,
  Example,
} from '../src/types/component.js';
import type { DesignTokens } from '../src/types/token.js';
import type { Pattern } from '../src/types/pattern.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const OUTPUT_DIR = join(__dirname, '..', 'src', 'data');
const COMPONENTS_DIR = join(OUTPUT_DIR, 'components');

// Category mapping for components
const CATEGORY_MAP: Record<string, ComponentCategory> = {
  // Layout
  Box: 'layout',
  Flex: 'layout',
  Grid: 'layout',
  Stack: 'layout',
  Container: 'layout',
  Divider: 'layout',

  // Navigation
  Nav: 'navigation',
  NavItem: 'navigation',
  Breadcrumb: 'navigation',
  BreadcrumbItem: 'navigation',
  Tabs: 'navigation',
  TabsList: 'navigation',
  TabsTrigger: 'navigation',
  TabsContent: 'navigation',
  Link: 'navigation',

  // Feedback
  Badge: 'feedback',
  Alert: 'feedback',
  AlertTitle: 'feedback',
  AlertDescription: 'feedback',
  Spinner: 'feedback',
  Progress: 'feedback',
  Toast: 'feedback',

  // Forms
  Button: 'forms',
  Input: 'forms',
  Checkbox: 'forms',
  Radio: 'forms',
  Select: 'forms',
  SelectTrigger: 'forms',
  SelectContent: 'forms',
  SelectItem: 'forms',
  Switch: 'forms',
  Textarea: 'forms',
  Label: 'forms',
  Field: 'forms',
  FieldLabel: 'forms',
  DateInput: 'forms',

  // Overlays
  Dialog: 'overlays',
  DialogTrigger: 'overlays',
  DialogContent: 'overlays',
  DialogTitle: 'overlays',
  DialogDescription: 'overlays',
  Menu: 'overlays',
  MenuItem: 'overlays',
  MenuTrigger: 'overlays',
  MenuContent: 'overlays',
  Tooltip: 'overlays',
  TooltipTrigger: 'overlays',
  TooltipContent: 'overlays',
  Popover: 'overlays',
  PopoverTrigger: 'overlays',
  PopoverContent: 'overlays',

  // Data Display
  Table: 'data-display',
  TableHeader: 'data-display',
  TableBody: 'data-display',
  TableRow: 'data-display',
  TableHead: 'data-display',
  TableCell: 'data-display',
  Card: 'data-display',
  Avatar: 'data-display',
  Code: 'data-display',

  // Typography
  Text: 'typography',
  Heading: 'typography',

  // Utilities
  Portal: 'utilities',
  VisuallyHidden: 'utilities',
  Transition: 'utilities',
};

/**
 * Generate component metadata
 */
async function generateComponentMetadata(): Promise<ComponentMetadata[]> {
  const components: ComponentMetadata[] = [];

  // For MVP, create metadata for key components
  // In a real implementation, this would parse TypeScript definitions
  for (const [name, category] of Object.entries(CATEGORY_MAP)) {
    const component: ComponentMetadata = {
      name,
      package: '@optiaxiom/react',
      category,
      description: `${name} component from Axiom Design System`,
      import: `import { ${name} } from '@optiaxiom/react';`,
      props: {
        // Basic props that most components have
        className: {
          type: 'string',
          description: 'Additional CSS class names',
        },
        children: {
          type: 'ReactNode',
          description: 'Component children',
        },
      },
      examples: generateExamples(name),
      since: '1.0.0',
      keywords: [name.toLowerCase(), category],
      docsUrl: `https://optimizely-axiom.github.io/optiaxiom/components/${name.toLowerCase()}`,
    };

    components.push(component);
  }

  return components;
}

/**
 * Generate basic examples for a component
 */
function generateExamples(componentName: string): Example[] {
  const examples: Example[] = [
    {
      title: `Basic ${componentName}`,
      description: `Simple example of ${componentName}`,
      code: `<${componentName}>\n  Content\n</${componentName}>`,
      language: 'tsx',
      tags: ['basic'],
    },
  ];

  // Add component-specific examples
  if (componentName === 'Badge') {
    examples.push({
      title: 'Badge with intent',
      description: 'Badge with different intents',
      code: `<Badge intent="information">Info</Badge>
<Badge intent="success">Success</Badge>
<Badge intent="warning">Warning</Badge>
<Badge intent="danger">Danger</Badge>`,
      language: 'tsx',
      tags: ['intent', 'variants'],
    });
  }

  if (componentName === 'Button') {
    examples.push({
      title: 'Button variants',
      description: 'Different button variants',
      code: `<Button appearance="primary">Primary</Button>
<Button appearance="secondary">Secondary</Button>
<Button appearance="danger">Danger</Button>`,
      language: 'tsx',
      tags: ['variants'],
    });
  }

  return examples;
}

/**
 * Generate registry index
 */
function generateRegistry(components: ComponentMetadata[]): ComponentRegistry {
  const categories: Record<ComponentCategory, string[]> = {
    layout: [],
    navigation: [],
    feedback: [],
    forms: [],
    overlays: [],
    'data-display': [],
    utilities: [],
    typography: [],
    primitives: [],
  };

  components.forEach((c) => {
    categories[c.category].push(c.name);
  });

  return {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    componentCount: components.length,
    categories,
    components: components.map((c) => c.name).sort(),
    metadata: {
      packageVersion: '1.0.0',
      schemaVersion: '1.0.0',
    },
  };
}

/**
 * Generate design tokens
 */
function generateTokens(): DesignTokens {
  return {
    colors: {
      neutral: {
        '50': '#fafafa',
        '100': '#f5f5f5',
        '200': '#e5e5e5',
        '300': '#d4d4d4',
        '400': '#a3a3a3',
        '500': '#737373',
        '600': '#525252',
        '700': '#404040',
        '800': '#262626',
        '900': '#171717',
        description: 'Neutral gray colors for text, backgrounds, and borders',
      },
      blue: {
        '50': '#eff6ff',
        '100': '#dbeafe',
        '200': '#bfdbfe',
        '300': '#93c5fd',
        '400': '#60a5fa',
        '500': '#3b82f6',
        '600': '#2563eb',
        '700': '#1d4ed8',
        '800': '#1e40af',
        '900': '#1e3a8a',
        description: 'Primary blue colors for interactive elements',
      },
    },
    spacing: {
      '0': { value: '0px', pixels: 0 },
      '1': { value: '0.25rem', pixels: 4 },
      '2': { value: '0.5rem', pixels: 8 },
      '4': { value: '1rem', pixels: 16 },
      '8': { value: '2rem', pixels: 32 },
      '16': { value: '4rem', pixels: 64 },
    },
    typography: {
      fontSizes: {
        xs: { value: '0.75rem', pixels: 12 },
        sm: { value: '0.875rem', pixels: 14 },
        base: { value: '1rem', pixels: 16 },
        lg: { value: '1.125rem', pixels: 18 },
        xl: { value: '1.25rem', pixels: 20 },
      },
      fontWeights: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      lineHeights: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
      },
      fontFamilies: {
        sans: 'system-ui, -apple-system, sans-serif',
        mono: 'ui-monospace, monospace',
      },
    },
    shadows: {
      sm: { value: '0 1px 2px 0 rgb(0 0 0 / 0.05)' },
      md: { value: '0 4px 6px -1px rgb(0 0 0 / 0.1)' },
      lg: { value: '0 10px 15px -3px rgb(0 0 0 / 0.1)' },
    },
    borderRadius: {
      none: { value: '0px', pixels: 0 },
      sm: { value: '0.125rem', pixels: 2 },
      md: { value: '0.375rem', pixels: 6 },
      lg: { value: '0.5rem', pixels: 8 },
      full: { value: '9999px', pixels: 9999 },
    },
    zIndex: {
      dropdown: 1000,
      sticky: 1100,
      modal: 1200,
      popover: 1300,
      tooltip: 1400,
    },
  };
}

/**
 * Generate patterns
 */
function generatePatterns(): Pattern[] {
  return [
    {
      name: 'form-layout',
      category: 'forms',
      description: 'Standard form layout with fields and validation',
      components: ['Field', 'FieldLabel', 'Input', 'Button'],
      code: `<form>
  <Field>
    <FieldLabel>Email</FieldLabel>
    <Input type="email" placeholder="Enter your email" />
  </Field>

  <Field>
    <FieldLabel>Password</FieldLabel>
    <Input type="password" placeholder="Enter your password" />
  </Field>

  <Button type="submit">Sign In</Button>
</form>`,
      notes: [
        'Use Field component to group labels with inputs',
        'Always provide accessible labels',
        'Include validation feedback when needed',
      ],
    },
    {
      name: 'card-layout',
      category: 'layout',
      description: 'Card-based layout for content sections',
      components: ['Card', 'Heading', 'Text', 'Button'],
      code: `<Card>
  <Heading>Card Title</Heading>
  <Text>
    Card content goes here with descriptive information.
  </Text>
  <Button>Action</Button>
</Card>`,
      notes: [
        'Use cards for grouping related content',
        'Keep card content concise and focused',
        'Include clear call-to-action when needed',
      ],
    },
  ];
}

/**
 * Main generation function
 */
async function generateMetadata() {
  console.log('🚀 Generating Axiom component metadata...\n');

  // Create output directories
  await mkdir(OUTPUT_DIR, { recursive: true });
  await mkdir(COMPONENTS_DIR, { recursive: true });

  // Generate all metadata
  console.log('📦 Generating component metadata...');
  const components = await generateComponentMetadata();

  console.log('🎨 Generating design tokens...');
  const tokens = generateTokens();

  console.log('📋 Generating patterns...');
  const patterns = generatePatterns();

  console.log('📊 Generating registry...');
  const registry = generateRegistry(components);

  // Write files
  console.log('\n💾 Writing files...');

  await writeFile(
    join(OUTPUT_DIR, 'components.json'),
    JSON.stringify(registry, null, 2)
  );
  console.log('  ✓ components.json');

  await writeFile(
    join(OUTPUT_DIR, 'tokens.json'),
    JSON.stringify(tokens, null, 2)
  );
  console.log('  ✓ tokens.json');

  await writeFile(
    join(OUTPUT_DIR, 'patterns.json'),
    JSON.stringify(patterns, null, 2)
  );
  console.log('  ✓ patterns.json');

  // Write individual component files
  for (const component of components) {
    await writeFile(
      join(COMPONENTS_DIR, `${component.name.toLowerCase()}.json`),
      JSON.stringify(component, null, 2)
    );
  }
  console.log(`  ✓ ${components.length} component files`);

  console.log(`\n✅ Successfully generated metadata for ${components.length} components!`);
  console.log(`\n📁 Output directory: ${OUTPUT_DIR}`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateMetadata().catch((error) => {
    console.error('❌ Error generating metadata:', error);
    process.exit(1);
  });
}

export { generateMetadata };
