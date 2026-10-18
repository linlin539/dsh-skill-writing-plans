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
 * Normalize an unknown thrown value into a readable message.
 * @param {unknown} error
 * @returns {string}
 */
function errorMessage(error) {
  if (error instanceof Error) return error.message;
  return String(error);
}

/**
 * Register the bundled `writing-plans` skill.
 *
 * Failure policy: never let this plugin take the host down. A DSH upgrade can
 * change the skill-provider contract, and a plugin that throws out of `apply()`
 * fails profile composition. Everything here is therefore wrapped so the worst
 * case is a logged warning and a missing skill, not a host that cannot boot.
 *
 * @param {import("@deepseek-ai/cordis").Context} ctx
 * @param {{ assetRoot?: string }} [config]
 */
function apply(ctx, config = {}) {
  const warn = (message) => {
    try {
      ctx?.logger?.warn?.(`skill-writing-plans: ${message}`);
    } catch {
      // A logger that is missing or throws must not turn a warning into a crash.
    }
  };

  try {
    const assetRoot = config.assetRoot ?? fileURLToPath(new URL("../assets/", import.meta.url));
    if (!isAbsolute(assetRoot)) {
      warn("assetRoot must be an absolute directory; skill not registered");
      return;
    }

    const skillName = "writing-plans";
    const directory = join(assetRoot, skillName);
    const path = join(directory, "SKILL.md");

    let description;
    try {
      if (!statSync(path).isFile()) {
        warn(`missing skill file ${path}; skill not registered`);
        return;
      }
      description = parseSkill(readFileSync(path, "utf8"), path).description;
    } catch (error) {
      warn(`cannot read ${path}: ${errorMessage(error)}; skill not registered`);
      return;
    }

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
          signal: options?.signal
        });
        return {
          ..._candidate,
          content: parseSkill(raw, path).content
        };
      }
    };

    if (typeof ctx?.skills?.registerProvider !== "function") {
      warn("ctx.skills.registerProvider is unavailable; skill not registered");
      return;
    }
    ctx.skills.registerProvider(() => provider);
  } catch (error) {
    warn(`registration failed: ${errorMessage(error)}; skill not registered`);
  }
}

export { apply, inject, name };
