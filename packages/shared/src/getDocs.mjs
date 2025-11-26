import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @typedef {import('react-docgen-typescript').PropItem} PropItem
 */

/**
 * @typedef {Object} ComponentDoc
 * @property {string} [description]
 * @property {string} displayName
 * @property {Prop[]} props
 * @property {Object} tags
 * @property {string} [tags.example]
 * @property {string} [tags.extends]
 */

/**
 * @typedef {Object} Prop
 * @property {PropItem['defaultValue']} [defaultValue]
 * @property {PropItem['description']} description
 * @property {PropItem['name']} name
 * @property {PropItem['required']} required
 * @property {PropItem['type']} type
 * @property {true} [sprinkle]
 */

/**
 * @returns {ComponentDoc[]}
 */
export function getDocs() {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/docs.json"), "utf-8"),
  );
}
