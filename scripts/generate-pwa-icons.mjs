// Generates PWA icons from a single pre-designed 1024x1024 app-icon source.
// The source already includes its own background and framing, so each output
// is just a clean resize. The source is full-bleed to the edges, so the same
// art works for the maskable icon (the safe area is built into the design).
//
// Run with: node scripts/generate-pwa-icons.mjs
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SOURCE = resolve(ROOT, "src/assets/app-icon-source.png");
const PUBLIC_DIR = resolve(ROOT, "public");
const OUT_DIR = resolve(PUBLIC_DIR, "icons");

async function makeIcon(size, out) {
  await sharp(SOURCE)
    .resize(size, size, { fit: "cover" })
    .png()
    .toFile(out);
  console.log(`  wrote ${out} (${size}x${size})`);
}

// Build a multi-resolution favicon.ico whose entries are PNG-encoded (valid
// per the ICO spec since Windows Vista and supported by all modern browsers).
// This avoids needing ImageMagick or extra dependencies.
async function makeFaviconIco(out, sizes = [16, 32, 48]) {
  const pngs = await Promise.all(
    sizes.map((s) => sharp(SOURCE).resize(s, s, { fit: "cover" }).png().toBuffer()),
  );

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(pngs.length, 4); // image count

  const entries = [];
  let offset = 6 + pngs.length * 16;
  pngs.forEach((png, i) => {
    const entry = Buffer.alloc(16);
    const dim = sizes[i] >= 256 ? 0 : sizes[i];
    entry.writeUInt8(dim, 0); // width
    entry.writeUInt8(dim, 1); // height
    entry.writeUInt8(0, 2); // palette count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png.length, 8); // size of image data
    entry.writeUInt32LE(offset, 12); // offset of image data
    offset += png.length;
    entries.push(entry);
  });

  await writeFile(out, Buffer.concat([header, ...entries, ...pngs]));
  console.log(`  wrote ${out} (ico: ${sizes.join(", ")})`);
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

  console.log("Generating favicon.ico...");
  await makeFaviconIco(resolve(PUBLIC_DIR, "favicon.ico"));

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
