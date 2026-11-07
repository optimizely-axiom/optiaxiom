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
 * @property {string} [entryPoint]
 * @property {Prop[]} props
 * @property {string} source
 * @property {Object} tags
 * @property {string} [tags.example]
 * @property {string} [tags.extends]
 */

/**
 * @typedef {Object} Field
 * @property {PropItem['defaultValue']} [defaultValue]
 * @property {PropItem['description']} [description]
 * @property {PropItem['required']} [required]
 * @property {PropItem['type']} type
 */

/**
 * @typedef {Object} Prop
 * @property {PropItem['defaultValue']} [defaultValue]
 * @property {PropItem['description']} description
 * @property {PropItem['name']} name
 * @property {PropItem['required']} required
 * @property {Properties} [properties] Fields of an object-typed prop, one level deep
 * @property {PropItem['type']} type
 * @property {true} [sprinkle]
 */

/**
 * @typedef {Object} Properties
 * @property {true} [array] The prop holds an array of this object type
 * @property {Record<string, Field>} fields
 * @property {string} [name] Name of the object type, when it has one
 */

/**
 * @returns {ComponentDoc[]}
 */
export function getDocs() {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/docs.json"), "utf-8"),
  );
}
