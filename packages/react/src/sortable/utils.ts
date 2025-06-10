export type Context = {
  /**
   * The total number of items in the list.
   */
  count: number;
  /**
   * The ID of the current item or list being rendered.
   */
  id: string;
  /**
   * The index of the current item or list being rendered.
   */
  index: number;
  /**
   * If item or list is the current drop target.
   */
  isDropTarget: boolean;
};

export type Items =
  | Record<string, Record<string, string[]>>
  | Record<string, string[]>
  | string[];

export const collapse = (items: Items) => {
  if (Array.isArray(items)) {
    return items;
  }

  const result: Record<string, string[]> = {};
  const entries = Object.entries<Record<string, string[]> | string[]>(items);
  while (entries.length) {
    const entry = entries.shift();
    if (!entry) {
      break;
    }

    const [key, value] = entry;
    if (Array.isArray(value)) {
      result[key] = value;
    } else {
      for (const entry of Object.entries(value)) {
        entries.push([`${key}:${entry[0]}`, entry[1]]);
      }
    }
  }
  return result;
};

export const expand = (items: Record<string, string[]> | string[]) => {
  if (Array.isArray(items)) {
    return items;
  }

  const result:
    | Record<string, Record<string, string[]>>
    | Record<string, string[]> = {};
  for (const [key, value] of Object.entries(items)) {
    const parts = key.split(":");
    let stack = result;
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!(part in stack)) {
        stack[part] = {};
      }
      if (!Array.isArray(stack[part])) {
        stack = stack[part];
      }
    }
    stack[parts[parts.length - 1]] = value;
  }
  return result;
};
