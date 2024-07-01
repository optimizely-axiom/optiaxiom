import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const self = path.basename(url.fileURLToPath(import.meta.url));

const files = fs.readdirSync(dirname).filter((file) => file !== self);
/**
 * @type {Record<string, import('eslint').Rule.RuleModule>}
 */
const rules = {};
for await (const file of files) {
  rules[path.parse(file).name] = (await import(`./${file}`)).default;
}

export default {
  rules,
};
