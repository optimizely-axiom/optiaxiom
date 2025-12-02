import { build } from "esbuild";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Padding around screenshots in pixels
 */
const SCREENSHOT_PADDING = 24;

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
  "AlertDialog",
  "Breadcrumb",
  "DataTable",
  "Dialog",
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
      plugins: [
        {
          name: "virtual-demo-files",
          setup(build) {
            // Intercept imports for demo files
            build.onResolve({ filter: /^\.\/.*/ }, (args) => {
              // Extract filename from the import path
              let filename = args.path.replace(/^\.\//, "");

              // Try exact match first
              if (example.code[filename]) {
                return {
                  namespace: "demo-virtual",
                  path: filename,
                };
              }

              for (const extension of ["ts", "tsx"]) {
                if (example.code[`${filename}.${extension}`]) {
                  return {
                    namespace: "demo-virtual",
                    path: `${filename}.${extension}`,
                  };
                }
              }

              return undefined;
            });

            // Provide contents for virtual demo files
            build.onLoad(
              { filter: /.*/, namespace: "demo-virtual" },
              (args) => {
                return {
                  contents: example.code[args.path],
                  loader: "tsx",
                  resolveDir: join(__dirname, "../../../packages/react"),
                };
              },
            );
          },
        },
      ],
      stdin: {
        contents: `
import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { AxiomProvider, TransitionGlobalConfig } from "@optiaxiom/react";
import { App } from "./App.tsx";

TransitionGlobalConfig.skipAnimations = true;

function Demo() {
  useEffect(() => {
    const button = document.getElementById("demo-root").querySelector('[aria-haspopup="dialog"][aria-expanded="false"]');
    if (button) {
      button.click();
      // Remove focus from all buttons before screenshot
      setTimeout(() => {
        if (document.activeElement) {
          document.activeElement.blur();
        }
      }, 0);
    }
  }, []);

  return (
    <AxiomProvider>
      <App />
    </AxiomProvider>
  );
}

const root = document.getElementById("demo-root");
if (root) {
  createRoot(root).render(<Demo />);
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

    // Check if there's a dialog or other portal-rendered content
    const dialog = page
      .locator('[role="dialog"], [role="alertdialog"]')
      .first();
    const hasDialog = (await dialog.count()) > 0;

    // Get bounding box and add padding
    const targetLocator = hasDialog
      ? dialog
      : page.locator("#demo-root").first();
    const box = await targetLocator.boundingBox();

    const screenshot = await page.screenshot({
      animations: "disabled",
      clip: box
        ? {
            height: box.height + SCREENSHOT_PADDING * 2,
            width: box.width + SCREENSHOT_PADDING * 2,
            x: Math.max(0, box.x - SCREENSHOT_PADDING),
            y: Math.max(0, box.y - SCREENSHOT_PADDING),
          }
        : undefined,
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
      padding: ${SCREENSHOT_PADDING}px;
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
