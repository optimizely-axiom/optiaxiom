import fg from "fast-glob";
import fs from "fs";

const baseUrl = "https://optimizely-axiom.github.io/optiaxiom";

// Find all HTML files in the build output
const htmlFiles = fg.globSync("out/**/*.html");

const urls = htmlFiles
  .map((file) => {
    // Convert "out/components/pill/index.html" to "/components/pill/"
    let url = file
      .replace("out", "")
      .replace("/index.html", "/")
      .replace(".html", "/");

    // Ensure URL starts with /
    if (!url.startsWith("/")) {
      url = "/" + url;
    }

    // Skip files that shouldn't be in sitemap
    if (url.includes("404") || url.includes("_next")) {
      return null;
    }

    return `  <url>
    <loc>${baseUrl}${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === "/" ? "1.0" : "0.8"}</priority>
  </url>`;
  })
  .filter(Boolean)
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

fs.writeFileSync("./out/sitemap.xml", sitemap);

console.log(`Generated sitemap with ${htmlFiles.length} pages`);
