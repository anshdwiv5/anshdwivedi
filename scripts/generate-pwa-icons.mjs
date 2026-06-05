// Generates PWA icons from a single pre-designed 1024x1024 app-icon source.
// The source already includes its own background and framing, so each output
// is just a clean resize. The source is full-bleed to the edges, so the same
// art works for the maskable icon (the safe area is built into the design).
//
// Run with: node scripts/generate-pwa-icons.mjs
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SOURCE = resolve(ROOT, "src/assets/app-icon-source.png");
const OUT_DIR = resolve(ROOT, "public/icons");

async function makeIcon(size, out) {
  await sharp(SOURCE)
    .resize(size, size, { fit: "cover" })
    .png()
    .toFile(out);
  console.log(`  wrote ${out} (${size}x${size})`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  console.log("Generating icons from app-icon-source.png...");
  await makeIcon(192, resolve(OUT_DIR, "icon-192.png"));
  await makeIcon(512, resolve(OUT_DIR, "icon-512.png"));
  await makeIcon(512, resolve(OUT_DIR, "icon-512-maskable.png"));
  await makeIcon(180, resolve(OUT_DIR, "apple-touch-icon.png"));
  await makeIcon(32, resolve(OUT_DIR, "favicon-32.png"));
  await makeIcon(16, resolve(OUT_DIR, "favicon-16.png"));

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
