// Post-build step: duplicate the prerendered SPA shell as 404.html.
// Static hosts that serve 404.html for unknown paths (e.g. GitHub Pages) then
// hand every deep link to the SPA shell, which routes client-side.
import { copyFile, access } from "node:fs/promises";
import { resolve } from "node:path";

const clientDir = resolve(process.cwd(), "dist/client");
const indexHtml = resolve(clientDir, "index.html");
const notFoundHtml = resolve(clientDir, "404.html");

try {
  await access(indexHtml);
  await copyFile(indexHtml, notFoundHtml);
  console.log("[spa-fallback] wrote dist/client/404.html");
} catch (err) {
  console.warn("[spa-fallback] skipped:", err.message);
}
