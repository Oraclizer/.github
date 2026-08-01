import { existsSync, readFileSync } from "node:fs";
import { dirname, normalize, resolve } from "node:path";

const root = process.cwd();
const failures = [];

function fail(message) {
  failures.push(message);
}

function read(relativePath) {
  const absolutePath = resolve(root, relativePath);
  if (!existsSync(absolutePath)) {
    fail(`Missing required file: ${relativePath}`);
    return "";
  }
  const content = readFileSync(absolutePath, "utf8");
  if (content.startsWith("\uFEFF")) fail(`UTF-8 BOM is not allowed: ${relativePath}`);
  if (content.includes("\uFFFD")) fail(`Replacement character found: ${relativePath}`);
  return content;
}

const requiredFiles = [
  "README.md",
  "LICENSE",
  "SECURITY.md",
  "CONTRIBUTING.md",
  "CODE_OF_CONDUCT.md",
  "SUPPORT.md",
  "GOVERNANCE.md",
  "profile/README.md",
  "profile/assets/oraclizer-system-map.svg",
  "profile/assets/oraclizer-system-map-mobile.svg",
  "profile/assets/oraclizer-social-preview.svg",
  ".github/CODEOWNERS",
  ".github/PULL_REQUEST_TEMPLATE.md",
  ".github/ISSUE_TEMPLATE/config.yml",
  ".github/ISSUE_TEMPLATE/documentation.yml",
  ".github/ISSUE_TEMPLATE/repository-surface.yml",
  ".github/dependabot.yml",
  ".github/workflows/repository-health.yml",
];

for (const file of requiredFiles) read(file);

const requiredBinaryFiles = ["profile/assets/oraclizer-social-preview.png"];
for (const file of requiredBinaryFiles) {
  if (!existsSync(resolve(root, file))) fail(`Missing required file: ${file}`);
}

const profile = read("profile/README.md");
const requiredProfileText = [
  "Formal, protocol, and proving foundations for cross-domain state synchronization",
  "System and research map",
  "Repository portfolio",
  "Preparing for public release",
  "Protocols and standards",
  "Published research",
  "Review and contact",
  "Typed Regulatory Uniformity for Security Tokens",
  "Unaudited and not for production",
];

for (const text of requiredProfileText) {
  if (!profile.includes(text)) fail(`Profile is missing required text: ${text}`);
}

const forbiddenPatterns = [
  [/Total Regulatory Unified/i, "stale ERC-TRUST expansion"],
  [/The first oracle/i, "unverifiable first claim"],
  [/complete state/i, "overbroad complete-state claim"],
  [/safety and liveness under Byzantine faults/i, "unsupported Byzantine liveness claim"],
  [/github\.com\/Oraclizer\/(?:erc-trust|statesync-gkr)/i, "private repository link"],
  [/[A-Za-z]:\\Users\\/i, "machine-local Windows path"],
];

const publicTextFiles = [
  "README.md",
  "SECURITY.md",
  "CONTRIBUTING.md",
  "CODE_OF_CONDUCT.md",
  "SUPPORT.md",
  "GOVERNANCE.md",
  "profile/README.md",
].map((file) => [file, read(file)]);

for (const [file, content] of publicTextFiles) {
  for (const [pattern, description] of forbiddenPatterns) {
    if (pattern.test(content)) fail(`${file} contains ${description}`);
  }
}

function verifyRelativeTargets(markdownPath, markdown) {
  const targets = [];
  for (const match of markdown.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) targets.push(match[1]);
  for (const match of markdown.matchAll(/(?:src|srcset)="([^"]+)"/g)) targets.push(match[1]);

  for (const rawTarget of targets) {
    const target = rawTarget.trim().split(/\s+/)[0];
    if (/^(?:https?:|mailto:|#)/i.test(target)) continue;
    const withoutFragment = target.split("#")[0].split("?")[0];
    if (!withoutFragment) continue;
    const candidate = normalize(resolve(root, dirname(markdownPath), withoutFragment));
    if (!candidate.startsWith(root)) {
      fail(`${markdownPath} escapes the repository: ${target}`);
    } else if (!existsSync(candidate)) {
      fail(`${markdownPath} has a missing relative target: ${target}`);
    }
  }
}

verifyRelativeTargets("README.md", read("README.md"));
verifyRelativeTargets("profile/README.md", profile);

for (const svgPath of [
  "profile/assets/oraclizer-system-map.svg",
  "profile/assets/oraclizer-system-map-mobile.svg",
  "profile/assets/oraclizer-social-preview.svg",
]) {
  const svg = read(svgPath);
  if (!/^<svg\b/.test(svg.trim())) fail(`${svgPath} does not begin with <svg>`);
  if (!/<title\b[^>]*>[^<]+<\/title>/.test(svg)) fail(`${svgPath} needs a non-empty title`);
  if (!/<desc\b[^>]*>[^<]+<\/desc>/.test(svg)) fail(`${svgPath} needs a non-empty description`);
  if (!/viewBox="0 0 \d+ \d+"/.test(svg)) fail(`${svgPath} needs a numeric viewBox`);
  if (/<script\b/i.test(svg)) fail(`${svgPath} must not contain scripts`);
  if (/\b(?:href|src)="https?:/i.test(svg)) fail(`${svgPath} must not load external resources`);
}

const previewPath = resolve(root, "profile/assets/oraclizer-social-preview.png");
const preview = readFileSync(previewPath);
const pngSignature = "89504e470d0a1a0a";
if (preview.subarray(0, 8).toString("hex") !== pngSignature) {
  fail("Social preview must be a valid PNG");
} else {
  const width = preview.readUInt32BE(16);
  const height = preview.readUInt32BE(20);
  if (width !== 1280 || height !== 640) {
    fail(`Social preview must be 1280x640, found ${width}x${height}`);
  }
}
if (preview.length >= 1_000_000) fail("Social preview must remain under 1 MB");

const workflow = read(".github/workflows/repository-health.yml");
const checkout = workflow.match(/actions\/checkout@([^\s#]+)/)?.[1] ?? "";
if (!/^[0-9a-f]{40}$/.test(checkout)) {
  fail("actions/checkout must be pinned to a full 40-character commit SHA");
}
if (!workflow.includes("permissions:\n  contents: read")) {
  fail("Repository-health workflow must use read-only contents permission");
}
if (!workflow.includes("timeout-minutes:")) {
  fail("Repository-health workflow must define a timeout");
}

if (failures.length > 0) {
  console.error("Repository health checks failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Repository health checks passed (${requiredFiles.length + requiredBinaryFiles.length} required files).`,
);
