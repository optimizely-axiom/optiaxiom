// Builds the Pagefind search index from the exported pages.
import fg from "fast-glob";
import fs from "fs/promises";
import * as pagefind from "pagefind";

const site = ".next/server/app";

const { index } = await pagefind.createIndex();
let pages = 0;
for (const sourcePath of await fg("**/*.html", { cwd: site })) {
  const html = await fs.readFile(`${site}/${sourcePath}`, "utf8");
  // Like the CLI: once the site marks its content with data-pagefind-body,
  // pages without it (404, home) stay out of the index.
  if (!html.includes("data-pagefind-body")) {
    continue;
  }
  const { errors, file } = await index.addHTMLFile({
    content: weightLead(html),
    sourcePath,
  });
  if (errors.length) {
    throw new Error(`${sourcePath}: ${errors.join(", ")}`);
  }
  if (file) {
    pages++;
  }
}
const { errors } = await index.writeFiles({ outputPath: "out/_pagefind" });
if (errors.length) {
  throw new Error(errors.join(", "));
}
console.log(`Indexed ${pages} pages`);
await pagefind.close();

/**
 * Weight each page's lead sentence (the paragraph right under its title) like
 * an h3. Pagefind ranks by term frequency and penalizes long pages, so a long
 * page like Menu ("Dropdown menu for displaying actions.") otherwise loses
 * "dropdown" to short pages that only mention it in passing.
 */
function weightLead(html) {
  return html.replace(/(<\/h1>\s*<p)(?=[\s>])/, '$1 data-pagefind-weight="5"');
}
