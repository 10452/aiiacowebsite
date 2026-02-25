/**
 * AiiACo Static Site Generation Script
 * Runs AFTER `vite build` and `build:ssr` to inject rendered HTML into each route.
 *
 * CRITICAL: Saves a clean copy of the Vite shell BEFORE overwriting any route files.
 * This prevents the homepage content from polluting sub-route shells.
 *
 * Usage: node scripts/prerender.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist", "public");

const ROUTES = [
  "/",
  "/manifesto",
  "/method",
  "/industries",
  "/models",
  "/case-studies",
  "/results",
  "/upgrade",
  "/privacy",
  "/terms",
];

// ─── Step 1: Load the clean Vite-built shell ───────────────────────────────
const shellPath = join(DIST, "index.html");
if (!existsSync(shellPath)) {
  console.error("❌ dist/public/index.html not found. Run `pnpm build:vite` first.");
  process.exit(1);
}

// Save a clean copy of the shell BEFORE we overwrite index.html with homepage content
const cleanShell = readFileSync(shellPath, "utf-8");

// Verify the shell is clean (root div should be empty)
if (!cleanShell.includes('<div id="root"></div>')) {
  console.error("❌ Shell is not clean — <div id=\"root\"> already has content.");
  console.error("   Run `pnpm build:vite` to regenerate a clean shell first.");
  process.exit(1);
}

console.log(`✅ Clean HTML shell loaded (${cleanShell.length} bytes)`);

// ─── Step 2: Load the SSR server entry ────────────────────────────────────
const serverEntryPath = join(ROOT, "dist", "server-entry.js");
if (!existsSync(serverEntryPath)) {
  console.error("❌ dist/server-entry.js not found. Run `pnpm build:ssr` first.");
  process.exit(1);
}

const { renderRoute } = await import(serverEntryPath);
console.log("✅ Server entry loaded");

// ─── Step 3: Render each route ────────────────────────────────────────────
let successCount = 0;
let errorCount = 0;

for (const route of ROUTES) {
  try {
    const { html: renderedHtml, helmetContext } = renderRoute(route);
    const helmet = helmetContext.helmet;

    // Start with the CLEAN shell every time (not the previously modified file)
    let output = cleanShell;

    // Inject rendered body HTML into the empty <div id="root">
    output = output.replace(
      '<div id="root"></div>',
      `<div id="root">${renderedHtml}</div>`
    );

    // Build helmet head tags string
    if (helmet) {
      const headTags = [
        helmet.title?.toString() ?? "",
        helmet.meta?.toString() ?? "",
        helmet.link?.toString() ?? "",
        helmet.script?.toString() ?? "",
        helmet.style?.toString() ?? "",
        helmet.noscript?.toString() ?? "",
      ]
        .filter(s => s && s.trim().length > 0)
        .join("\n    ");

      if (headTags) {
        // Remove the default title from the shell (helmet will inject the correct one)
        output = output.replace(
          /<title>[^<]*<\/title>/,
          ""
        );
        // Inject helmet tags before </head>
        output = output.replace("</head>", `  ${headTags}\n  </head>`);
      }
    }

    // Determine output path
    const routeDir = route === "/" ? DIST : join(DIST, route.slice(1));
    mkdirSync(routeDir, { recursive: true });
    const outPath = join(routeDir, "index.html");
    writeFileSync(outPath, output, "utf-8");

    // Sanity check — count visible text words in the rendered HTML only
    const textContent = renderedHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const wordCount = textContent.split(" ").filter(w => w.length > 2).length;

    // Verify title was injected
    const titleMatch = output.match(/<title[^>]*>([^<]+)/);
    const titleText = titleMatch ? titleMatch[1] : "NO TITLE";

    console.log(`✅ ${route.padEnd(15)} → ${wordCount} words | title: "${titleText.slice(0, 50)}"`);
    successCount++;
  } catch (err) {
    console.error(`❌ Failed to render ${route}:`, err.message);
    if (process.env.DEBUG) console.error(err.stack);
    errorCount++;
  }
}

console.log(`\n🏁 Prerender complete: ${successCount} routes OK, ${errorCount} errors.`);
if (errorCount > 0) process.exit(1);

console.log("\n📋 Output files:");
for (const route of ROUTES) {
  const routeDir = route === "/" ? DIST : join(DIST, route.slice(1));
  const outPath = join(routeDir, "index.html");
  const size = existsSync(outPath) ? Math.round(readFileSync(outPath).length / 1024) : 0;
  console.log(`   ${route.padEnd(15)} → ${outPath.replace(ROOT, "")} (${size}KB)`);
}
