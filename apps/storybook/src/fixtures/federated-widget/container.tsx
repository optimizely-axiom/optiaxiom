import Widget from "./Widget";

const modules: Record<string, () => Record<string, unknown>> = {
  ".": () => ({ default: Widget }),
  "./App": () => ({ default: Widget }),
  "./Dashboard": () => ({ default: Widget }),
};

export function get(id: string) {
  if (!(id in modules)) {
    throw new Error(`Module ${id} not found in federated-widget`);
  }
  return modules[id];
}

export function init() {}
