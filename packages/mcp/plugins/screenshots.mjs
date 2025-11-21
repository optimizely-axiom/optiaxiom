import { build } from "esbuild";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @typedef {import('playwright').BrowserContext} BrowserContext
 * @typedef {import('../src/types.js').Example} Example
 */

/**
 * Components that should have screenshots generated for their examples.
 * These are typically molecular components composed of multiple atoms.
 * @type {readonly string[]}
 */
const COMPONENTS_WITH_SCREENSHOTS = [
  "Breadcrumb",
  // "DataTable",
  "Disclosure",
  "Pagination",
  "RadioGroup",
  // "Sidebar",
  "Skeleton",
  "Tabs",
];

/**
 * Generate screenshots for component examples using Playwright and esbuild
 *
 * @param {BrowserContext} context
 * @param {string} componentName - Name of the component (e.g., "Tabs")
 * @param {Example} example
 * @returns {Promise<Example>} Examples with screenshot data URLs added
 */
export async function captureScreenshot(context, componentName, example) {
  if (!shouldGenerateScreenshot(componentName) || example.title !== "usage") {
    return example;
  }

  const page = await context.newPage();

  try {
    const result = await build({
      absWorkingDir: join(__dirname, "../../../packages/react"),
      bundle: true,
      format: "esm",
      jsx: "automatic",
      jsxImportSource: "react",
      loader: { ".jpg": "empty", ".woff2": "empty" },
      logLevel: "error",
      outdir: "dist",
      stdin: {
        contents: `
          import { createRoot } from "react-dom/client";
          import { AxiomProvider } from "@optiaxiom/react";
          ${example.code["App.tsx"]};

          const root = document.getElementById("demo-root");
          if (root) {
            createRoot(root).render(
              <AxiomProvider>
                <App />
              </AxiomProvider>,
            );
          }
        `,
        loader: "tsx",
        resolveDir: join(__dirname, "../../../packages/react"),
      },
      write: false,
    });

    page.on("console", (msg) => {
      const type = msg.type();
      const text = msg.text();
      console.log(`[${type}] ${text}`);
    });

    page.on("pageerror", (error) => {
      console.error(`Page error: ${error.message}`);
    });

    await page.setContent(
      createDemoHTML(
        result.outputFiles.find((f) => f.path.endsWith(".js"))?.text || "",
        result.outputFiles.find((f) => f.path.endsWith(".css"))?.text || "",
      ),
      { waitUntil: "networkidle" },
    );

    await page.waitForTimeout(1000);
    await page.waitForSelector("#demo-root:not(:empty)", { timeout: 5000 });
    await page.waitForTimeout(500);

    const screenshot = await page.locator("#demo-root").first().screenshot({
      timeout: 10000,
      type: "png",
    });

    console.log(`✓ Generated screenshot for ${componentName}/${example.title}`);
    return {
      ...example,
      screenshot: `data:image/png;base64,${screenshot.toString("base64")}`,
    };
  } catch (error) {
    console.warn(
      `✗ Failed to generate screenshot for ${componentName}/${example.title}:`,
      error instanceof Error ? error.message : error,
    );
    return example;
  }
}

/**
 * Check if a component should have screenshots generated
 * @param {string} componentName
 * @returns {boolean}
 */
export function shouldGenerateScreenshot(componentName) {
  return COMPONENTS_WITH_SCREENSHOTS.includes(componentName);
}

/**
 * @param {string} bundledJS
 * @param {string} css
 * @returns {string}
 */
function createDemoHTML(bundledJS, css) {
  const escapedJS = bundledJS.replace(/<\/script>/gi, "<\\/script>");

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${css}</style>
  <style>
    body {
      margin: 0;
      padding: 24px;
      font-family: system-ui, -apple-system, sans-serif;
    }
    #demo-root {
      display: inline-block;
      min-width: 200px;
      min-height: 50px;
    }
  </style>
</head>
<body>
  <div id="demo-root"></div>
  <script type="module">
${escapedJS}
  </script>
</body>
</html>`;
}
