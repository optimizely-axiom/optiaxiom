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
 * @property {Shape} [shape] Structure of a field holding the library's own object types
 */

/**
 * @typedef {Object} Prop
 * @property {PropItem['defaultValue']} [defaultValue]
 * @property {PropItem['description']} description
 * @property {PropItem['name']} name
 * @property {PropItem['required']} required
 * @property {PropItem['type']} type
 * @property {Shape} [shape] Structure of a prop holding the library's own object types
 * @property {true} [sprinkle]
 */

/**
 * @typedef {{ anyOf: Shape[] }
 *   | { const: boolean | number | string }
 *   | { fields: Record<string, Field>; name?: string }
 *   | { items: Shape }
 *   | { type: "boolean" | "null" | "number" | "string" }
 *   | { values: Shape }} Shape
 *   A type's structure: a union, a literal, an object's fields (and its type
 *   name), an array's elements, a primitive, or a string-keyed record's values
 */

/**
 * @returns {ComponentDoc[]}
 */
export function getDocs() {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/docs.json"), "utf-8"),
  );
}
