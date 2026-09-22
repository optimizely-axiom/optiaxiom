import type { Folder, Meta, MetaJsonFile, PageMapItem } from "nextra";

/** Route folders whose pages get hoisted into the root sidebar list. */
const SECTIONS = ["guides", "components", "props"];

const isFolder = (item: PageMapItem): item is Folder =>
  "children" in item && Array.isArray(item.children);

const isMeta = (item: PageMapItem): item is MetaJsonFile => "data" in item;

/**
 * Flatten the page map so every page sits at the root of the sidebar.
 *
 * Nextra renders anything with children as a collapsible folder and scopes the
 * sidebar to the active top-level section, so hoisting is what lets the whole
 * site show as one browsable list. Order, grouping, separators, titles and
 * `display: "hidden"` all still come from `_meta.global.tsx` — this only moves
 * entries up a level, preserving their order, and prefixes each key with its
 * section so the three `index` pages (and each folder's `--` separator) don't
 * collide.
 */
export function flattenPageMap(pageMap: PageMapItem[]): PageMapItem[] {
  const data: Record<string, Meta> = { ...pageMap.find(isMeta)?.data };
  const items: PageMapItem[] = [];

  for (const item of pageMap) {
    if (isMeta(item)) {
      continue;
    }

    if (!isFolder(item) || !SECTIONS.includes(item.name)) {
      items.push(item);
      continue;
    }

    delete data[item.name];

    const meta = item.children.find(isMeta)?.data ?? {};

    for (const child of item.children) {
      if (isMeta(child)) {
        continue;
      }

      const key = `${item.name}/${child.name}`;
      data[key] = meta[child.name] ?? {};
      items.push({ ...child, name: key });
    }
  }

  return [{ data }, ...items];
}
