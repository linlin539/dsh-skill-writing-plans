import { readFile } from "node:fs/promises";
import { readFileSync, statSync } from "node:fs";
import { dirname, isAbsolute, join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Bundled skills are sorted after project and user skills.
 * This mirrors the constant from @deepseek-ai/dsh-skill to keep the plugin
 * self-contained and avoid requiring the host runtime's internal package graph.
 */
const BUNDLED_SKILL_RANK = 600;

/**
 * Cordis plugin identity.
 * @type {string}
 */
const name = "skill-writing-plans";

/**
 * Registry used by the bundled provider.
 * @type {string[]}
 */
const inject = ["skills"];

/**
 * Parse a minimal YAML frontmatter block and return the description + body.
 * @param {string} raw
 * @param {string} path
 * @returns {{ description: string, content: string }}
 */
function parseSkill(raw, path) {
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/u.exec(raw);
  if (frontmatter?.[1] === void 0) {
    throw new Error(`skill-writing-plans: ${path} has no YAML frontmatter`);
  }
  // Use a tiny frontmatter parser: look for `description: ...` line.
  const descriptionMatch = /(?:^|\n)description:\s*(.+)(?:\r?\n|$)/i.exec(frontmatter[1]);
  const description = descriptionMatch?.[1]?.trim();
  if (typeof description !== "string" || description.length === 0) {
    throw new Error(`skill-writing-plans: ${path} has no description`);
  }
  return {
    description,
    content: raw.slice(frontmatter[0].length).trim()
  };
}

/**
 * Register the bundled `writing-plans` skill.
 *
 * @param {import("@deepseek-ai/cordis").Context} ctx
 * @param {{ assetRoot?: string }} [config]
 */
function apply(ctx, config = {}) {
  const assetRoot = config.assetRoot ?? fileURLToPath(new URL("../assets/", import.meta.url));
  if (!isAbsolute(assetRoot)) {
    throw new Error("skill-writing-plans: assetRoot must be an absolute directory");
  }

  const skillName = "writing-plans";
  const directory = join(assetRoot, skillName);
  const path = join(directory, "SKILL.md");

  if (!statSync(path).isFile()) {
    throw new Error(`skill-writing-plans: missing skill file ${path}`);
  }

  const { description } = parseSkill(readFileSync(path, "utf8"), path);

  const candidate = {
    name: skillName,
    description,
    invocation: {
      modelInvocable: true,
      userInvocable: true
    },
    provider: "writing-plans",
    source: "bundled",
    rank: BUNDLED_SKILL_RANK,
    resourceBase: {
      kind: "directory",
      path: directory
    },
    locator: path
  };

  const provider = {
    name: "writing-plans",
    list: () => Promise.resolve([candidate]),
    async get(_candidate, options) {
      const raw = await readFile(path, {
        encoding: "utf8",
        signal: options.signal
      });
      return {
        ..._candidate,
        content: parseSkill(raw, path).content
      };
    }
  };

  ctx.skills.registerProvider(() => provider);
}

export { apply, inject, name };
